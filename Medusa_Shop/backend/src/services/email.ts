import { Resend } from "resend"

// Check if we're in production
export function isProduction(): boolean {
    return process.env.NODE_ENV === "production"
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || "")

// Brand configuration  
const BRAND_NAME = process.env.BRAND_NAME || "MEDUSA"
const FROM_EMAIL = process.env.RESEND_FROM || "onboarding@resend.dev"

// Luxury email template
function createEmailTemplate(content: string, preheader: string = ""): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${BRAND_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <span style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">${preheader}</span>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #eee;">
                            <h1 style="margin: 0; font-size: 28px; letter-spacing: 8px; font-weight: 400; color: #000;">
                                ${BRAND_NAME}
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 50px 40px;">
                            ${content}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; background-color: #fafafa; text-align: center; border-top: 1px solid #eee;">
                            <p style="margin: 0; font-size: 12px; color: #888; line-height: 1.8;">
                                This email was sent by ${BRAND_NAME}<br>
                                If you didn't request this email, please ignore it.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
}

// Send verification code email
export async function sendVerificationEmail(
    to: string,
    code: string,
    firstName?: string
): Promise<boolean> {
    // Skip email in development
    if (!isProduction()) {
        console.log(`[DEV] Would send verification email to ${to} with code ${code}`)
        return false
    }

    const greeting = firstName ? `Hello ${firstName},` : "Hello,"

    const content = `
        <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.6;">
            ${greeting}
        </p>
        <p style="margin: 0 0 30px; font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for creating an account. Please use the verification code below to complete your registration:
        </p>
        <div style="text-align: center; margin: 40px 0;">
            <div style="display: inline-block; background-color: #f8f8f8; padding: 20px 40px; border: 2px solid #000; font-size: 32px; letter-spacing: 12px; font-weight: 600; color: #000;">
                ${code}
            </div>
        </div>
        <p style="margin: 20px 0 0; font-size: 14px; color: #666; text-align: center;">
            This code expires in 15 minutes.
        </p>
    `

    try {
        const { data, error } = await resend.emails.send({
            from: `${BRAND_NAME} <${FROM_EMAIL}>`,
            to: [to],
            subject: `${code} is your verification code`,
            html: createEmailTemplate(content, `Your verification code is ${code}`),
        })

        if (error) {
            console.error(`❌ Failed to send verification email to ${to}:`, error)
            return false
        }

        console.log(`✅ Verification email sent to ${to} (ID: ${data?.id})`)
        return true
    } catch (error) {
        console.error(`❌ Failed to send verification email to ${to}:`, error)
        return false
    }
}

// Send welcome email after verification
export async function sendWelcomeEmail(
    to: string,
    firstName?: string
): Promise<boolean> {
    // Skip email in development
    if (!isProduction()) {
        console.log(`[DEV] Would send welcome email to ${to}`)
        return false
    }

    const greeting = firstName ? `Welcome, ${firstName}!` : "Welcome!"

    const content = `
        <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 400; color: #000; text-align: center;">
            ${greeting}
        </h2>
        <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.8; text-align: center;">
            Your account has been verified and is now active.
        </p>
        <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/shop" 
               style="display: inline-block; background-color: #000; color: #fff; padding: 16px 48px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                Start Shopping
            </a>
        </div>
    `

    try {
        const { data, error } = await resend.emails.send({
            from: `${BRAND_NAME} <${FROM_EMAIL}>`,
            to: [to],
            subject: `Welcome to ${BRAND_NAME}`,
            html: createEmailTemplate(content, `Welcome to ${BRAND_NAME}!`),
        })

        if (error) {
            console.error(`❌ Failed to send welcome email to ${to}:`, error)
            return false
        }

        console.log(`✅ Welcome email sent to ${to} (ID: ${data?.id})`)
        return true
    } catch (error) {
        console.error(`❌ Failed to send welcome email to ${to}:`, error)
        return false
    }
}
