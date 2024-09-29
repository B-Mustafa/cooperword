import React from 'react';

interface EmailTemplateProps {
  firstName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  reminderTimeInMinutes: number;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, eventTitle, eventDate, eventTime, reminderTimeInMinutes }) => {
  return (
    <div>
      <h1>Hello {firstName},</h1>
      <p>Do not forget about your upcoming event:</p>
      <h2>{eventTitle}</h2>
      <p>Scheduled for: {eventDate} at {eventTime}</p>
      <p>You set this reminder {reminderTimeInMinutes} minutes before the event.</p>
      <p>Best regards,<br />Your Event Management Team</p>
    </div>
  );
};
