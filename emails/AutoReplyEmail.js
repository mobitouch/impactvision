import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

export default function AutoReplyEmail({ firstName }) {
  const e = React.createElement;

  return e(Html, null,
    e(Head, null),
    e(Preview, null, 'We received your message - Impact Vision'),
    e(Body, { style: main },
      e(Container, { style: container },
        e(Heading, { style: h1 }, 'Thank you for reaching out.'),
        e(Text, { style: text },
          `Hi ${firstName},`
        ),
        e(Text, { style: text },
          'We have received your message and our team will get back to you shortly. Whether you are planning an international festival or a corporate gala, our experts are ready to bring your vision to life.'
        ),
        e(Section, { style: buttonContainer },
          e(Link, { style: button, href: 'https://impactvision.com' }, 'Visit Our Website')
        ),
        e(Hr, { style: hr }),
        e(Text, { style: footer },
          'Impact Vision | Riyadh, Kingdom of Saudi Arabia'
        )
      )
    )
  );
}

const main = {
  backgroundColor: '#0a192f', // Match navy theme roughly
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#112240',
  margin: '40px auto',
  padding: '20px 0 48px',
  borderRadius: '8px',
  border: '1px solid #233554',
  maxWidth: '600px',
};

const h1 = {
  color: '#e2e8f0', // Accent color ish
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  padding: '0 48px',
};

const text = {
  color: '#88a0c8',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  marginBottom: '16px',
};

const buttonContainer = {
  padding: '24px 48px',
};

const button = {
  backgroundColor: '#d4e0ed',
  borderRadius: '4px',
  color: '#0a192f',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
  padding: '16px 0',
};

const hr = {
  borderColor: '#233554',
  margin: '20px 0',
};

const footer = {
  color: '#6a8ab0',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
  textAlign: 'center',
};
