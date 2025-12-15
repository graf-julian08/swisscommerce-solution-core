import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { sendVerificationEmail } from "../../../../services/email"
import { verificationCodes } from "../register/route"

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// POST /store/auth/resend - Resend verification code
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const { email } = req.body as { email: string }

    if (!email) {
        return res.status(400).json({ error: "Email is required" })
    }

    const emailLower = email.toLowerCase()

    try {
        const stored = verificationCodes.get(emailLower)

        if (!stored) {
            return res.status(400).json({ error: "No pending verification found. Please register again." })
        }

        // Generate new code
        const newCode = generateCode()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        // Update stored data with new code
        verificationCodes.set(emailLower, {
            ...stored,
            code: newCode,
            expiresAt
        })

        // Send new verification email
        const emailSent = await sendVerificationEmail(
            email,
            newCode,
            stored.userData?.first_name
        )

        if (!emailSent) {
            console.log(`\n========================================`)
            console.log(`NEW VERIFICATION CODE for ${email}: ${newCode}`)
            console.log(`========================================\n`)
        }

        return res.status(200).json({
            success: true,
            message: emailSent
                ? "New verification code sent"
                : "New code generated (check server logs)"
        })
    } catch (error: any) {
        console.error("Resend error:", error)
        return res.status(500).json({ error: error.message || "Failed to resend code" })
    }
}
