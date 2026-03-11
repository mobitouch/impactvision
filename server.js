import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'; // Load .env
import { Resend } from 'resend';
import { render } from '@react-email/components';
import xss from 'xss';
import rateLimit from 'express-rate-limit';

// Import email templates
import NotificationEmail from './emails/NotificationEmail.js';
import AutoReplyEmail from './emails/AutoReplyEmail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');
// For production, use your actual domain (e.g., info@impactvision.com). 
// Onboarding domains only work if sending to the verified dev email.
const FROM_EMAIL = 'onboarding@resend.dev'; 
const TO_EMAIL = 'info@impactvision.com'; // Change to where you want notifications

// Add body parsing with a strict limit to prevent huge payloads
app.use(express.json({ limit: '10kb' }));

// Set up Rate Limiter for the contact API
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 requests per `window`
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true, 
    legacyHeaders: false,
});

// Enable gzip/brotli compression for ultra-fast text/js/css delivery
app.use(compression());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
});

// Contact API Endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { bot_field, firstName, lastName, email, message } = req.body;

        // 1. Honeypot check
        if (bot_field) {
            // Silently return success to fool the bot
            return res.status(200).json({ success: true });
        }

        // 2. Basic Server-side Validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        if (message.length > 2000) {
            return res.status(400).json({ error: 'Message is too long.' });
        }

        // 3. Sanitize inputs to prevent XSS
        const safeFirstName = xss(firstName);
        const safeLastName = xss(lastName);
        const safeEmail = xss(email);
        const safeMessage = xss(message);

        // 4. Render Email Templates to HTML strings
        const notificationHtml = await render(
            NotificationEmail({
                firstName: safeFirstName,
                lastName: safeLastName,
                email: safeEmail,
                message: safeMessage
            })
        );

        const autoReplyHtml = await render(
            AutoReplyEmail({
                firstName: safeFirstName
            })
        );

        // 5. Send both emails in parallel using Promise.all
        const [notificationRes, autoReplyRes] = await Promise.all([
            resend.emails.send({
                from: `Impact Vision <${FROM_EMAIL}>`,
                to: [TO_EMAIL],
                replyTo: safeEmail,
                subject: `New Contact Form Submission: ${safeFirstName} ${safeLastName}`,
                html: notificationHtml,
            }),
            resend.emails.send({
                from: `Impact Vision <${FROM_EMAIL}>`,
                to: [safeEmail],
                subject: 'Message Received - Impact Vision',
                html: autoReplyHtml,
            })
        ]);

        if (notificationRes.error || autoReplyRes.error) {
            console.error('Resend Error:', notificationRes.error || autoReplyRes.error);
            return res.status(500).json({ error: 'Failed to send emails.' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Serve the static 'dist' directory created by Vite
// Includes strict 1-year cache headers for static assets
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Fallback for React Router (Single Page Application routing)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Production server running on port ${PORT}`);
});
