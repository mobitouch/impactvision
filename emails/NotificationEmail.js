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
} from '@react-email/components';

export default function NotificationEmail({ firstName, lastName, email, message }) {
  const e = React.createElement;

  return e(Html, null,
    e(Head, null),
    e(Preview, null, `New Contact Form Submission from ${firstName} ${lastName}`),
    e(Body, { style: main },
      e(Container, { style: container },
        e(Heading, { style: h1 }, 'New Website Contact Submission'),
        e(Text, { style: text },
          'You have received a new message from the Impact Vision contact form.'
        ),
        e(Hr, { style: hr }),
        e(Section, { style: section },
          e(Text, { style: label }, 'Name:'),
          e(Text, { style: value }, `${firstName} ${lastName}`),
          
          e(Text, { style: label }, 'Email:'),
          e(Text, { style: value }, email),
          
          e(Text, { style: label }, 'Message:'),
          e(Text, { style: messageBox }, message)
        ),
        e(Hr, { style: hr }),
        e(Text, { style: footer },
          'This email was generated automatically by your website\'s contact form.'
        )
      )
    )
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
  maxWidth: '600px',
};

const h1 = {
  color: '#002b5c',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  padding: '0 48px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
};

const section = {
  padding: '0 48px',
};

const label = {
  color: '#88a0c8',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  margin: '0 0 4px',
};

const value = {
  color: '#002b5c',
  fontSize: '16px',
  margin: '0 0 20px',
};

const messageBox = {
  color: '#002b5c',
  fontSize: '16px',
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '4px',
  margin: '0',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
};
