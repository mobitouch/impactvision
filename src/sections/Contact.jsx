import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (data) => {
        try {
            // Simulate EmailJS Send for demo. The client will plug in their keys.
            // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');
            await new Promise(r => setTimeout(r, 1500));
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to send email");
        }
    };

    return (
        <section id="contact" className="bg-navy text-white pt-[120px] pb-10 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px]"
                style={{ backgroundImage: "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)" }} />

            <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-[120px]">
                {/* Left Col */}
                <div>
                    <div className="font-mono text-[11px] text-accent tracking-[0.2em] mb-4">07 — CONTACT</div>
                    <h2 className="font-serif text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.02em] mb-8">
                        Ready to make an <em className="italic text-accent">Impact?</em>
                    </h2>
                    <p className="font-sans text-[16px] text-[#88a0c8] mb-12 max-w-[480px] leading-[1.7]">
                        Whether you’re planning an international festival or a corporate gala, our experts are ready to bring your vision to life. Let’s discuss your next production.
                    </p>

                    <div className="flex flex-col gap-6 font-sans text-[15px]">
                        <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Email</span>
                            <a href="mailto:info@impactvision.com" className="hover:text-accent transition-colors">info@impactvision.com</a>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Main Office</span>
                            <span className="text-[#88a0c8]">Riyadh, Kingdom of Saudi Arabia</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Follow Us</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                                <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Form */}
                <div className="bg-[#ffffff05] border border-accent/20 rounded-[16px] p-8 md:p-12 backdrop-blur-sm">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-up">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30 text-accent text-2xl">
                                ✓
                            </div>
                            <h3 className="font-serif text-[32px] mb-3">Message Received</h3>
                            <p className="font-sans text-[#88a0c8] max-w-[300px] leading-[1.6]">
                                Thank you for reaching out. Our team will get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">First Name</label>
                                    <input {...register("firstName", { required: true })} data-cursor="TYPE"
                                        className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                                        placeholder="John" />
                                    {errors.firstName && <span className="text-red-400 text-[11px] font-sans">Required folder</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Last Name</label>
                                    <input {...register("lastName", { required: true })} data-cursor="TYPE"
                                        className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                                        placeholder="Doe" />
                                    {errors.lastName && <span className="text-red-400 text-[11px] font-sans">Required field</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Email Address</label>
                                <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} data-cursor="TYPE"
                                    className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors placeholder:text-white/20"
                                    placeholder="john@example.com" />
                                {errors.email && <span className="text-red-400 text-[11px] font-sans">Valid email required</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">Message</label>
                                <textarea {...register("message", { required: true })} rows={4} data-cursor="TYPE"
                                    className="bg-transparent border-b border-[#ffffff33] py-2 outline-none focus:border-accent text-white font-sans transition-colors resize-none placeholder:text-white/20"
                                    placeholder="Tell us about your project..." />
                                {errors.message && <span className="text-red-400 text-[11px] font-sans">Required field</span>}
                            </div>

                            <button type="submit" disabled={isSubmitting} data-cursor="SEND"
                                className="mt-4 bg-accent text-navy py-[16px] rounded-md font-sans text-[15px] font-bold tracking-wide shadow-[0_4px_20px_rgba(212,224,237,0.2)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(212,224,237,0.3)] transition-all disabled:opacity-50 disabled:-translate-y-0"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-[120px] pt-10 border-t border-[#ffffff11] relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="font-serif text-[24px] text-white">Impact Vision</div>
                <div className="font-sans text-[13px] text-[#6a8ab0]">
                    © {new Date().getFullYear()} Impact Vision. All rights reserved.
                </div>
            </footer>
        </section>
    );
}
