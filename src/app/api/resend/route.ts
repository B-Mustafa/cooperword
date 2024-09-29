// api/resend/route.ts
import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { title, date, time, reminderTimeInMinutes, email, firstName } = await request.json();

  try {
    const emailContent = EmailTemplate({ firstName, eventTitle: title, eventDate: date, eventTime: time, reminderTimeInMinutes });
    
    const { data, error } = await resend.emails.send({
      from: 'Contact@mustafabhikhapur.me',
      to: [email],
      subject: `Reminder for "${title}"`,
      react: emailContent,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
