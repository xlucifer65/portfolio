import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  reason: z.enum(['work', 'consultation', 'france', 'woxsen', 'general', 'other']),
  message: z.string().min(20).max(5000),
})

const WORK_EMAIL = process.env.EMAIL_WORK || 'rayyanahemad04@gmail.com'
const GENERAL_EMAIL = process.env.EMAIL_GENERAL || 'xlucifer65@gmail.com'
const FROM_EMAIL = process.env.EMAIL_FROM || 'hello@rayyanahemad.com'

const reasonLabels: Record<string, string> = {
  work: 'Work / Collaboration',
  consultation: 'Consultation',
  france: 'France Experience',
  woxsen: 'Woxsen Experience',
  general: 'General Conversation',
  other: 'Other',
}

function routeEmail(reason: string): string {
  return reason === 'work' ? WORK_EMAIL : GENERAL_EMAIL
}

function buildEmailHtml(name: string, email: string, reason: string, message: string): string {
  const label = reasonLabels[reason] || reason
  const escapedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')
  return `
    <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 28px 32px;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 800;">New message on rayyanahemad.com</h1>
        <p style="margin: 6px 0 0; opacity: 0.8; font-size: 14px;">Via the contact form</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); width: 110px; font-size: 13px; color: #64748b; font-weight: 500;">From</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px;">${name} &lt;${email}&gt;</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; color: #64748b; font-weight: 500;">Reason</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span style="background: rgba(99,102,241,0.15); color: #818cf8; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;">${label}</span>
            </td>
          </tr>
        </table>
        <div style="margin-top: 24px;">
          <p style="font-size: 13px; color: #64748b; font-weight: 500; margin-bottom: 10px;">Message</p>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
            ${escapedMessage}
          </div>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #475569;">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
    }

    const { name, email, reason, message } = parsed.data

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — skipping email send in dev mode.')
      return NextResponse.json({ success: true, dev: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const toEmail = routeEmail(reason)

    await resend.emails.send({
      from: `Rayyan Portfolio <${FROM_EMAIL}>`,
      to: toEmail,
      reply_to: email,
      subject: `[Portfolio] ${reasonLabels[reason]} from ${name}`,
      html: buildEmailHtml(name, email, reason, message),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send. Try emailing directly.' }, { status: 500 })
  }
}
