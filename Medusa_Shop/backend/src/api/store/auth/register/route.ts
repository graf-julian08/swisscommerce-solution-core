import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { sendVerificationEmail, isProduction } from "../../../../services/email"

// In-memory store for verification codes
export const verificationCodes = new Map<string, { code: string; expiresAt: Date; userData: any }>()

// Generate 6-digit code
function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// POST /store/auth/register - Register and send verification email
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const { email, password, first_name, last_name } = req.body as {
        email: string
        password: string
        first_name: string
        last_name: string
    }

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        // Check if email already exists
        const customerModule = req.scope.resolve(Modules.CUSTOMER)
        const existingCustomers = await customerModule.listCustomers({ email })

        if (existingCustomers.length > 0) {
            return res.status(400).json({ error: "Email already registered" })
        }

        // Generate verification code
        const code = generateCode()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

        // Store pending registration
        verificationCodes.set(email.toLowerCase(), {
            code,
            expiresAt,
            userData: { email: email.toLowerCase(), password, first_name, last_name }
        })

        // In development mode, return the code directly
        if (!isProduction()) {
            console.log(`\n[DEV MODE] Verification code for ${email}: ${code}\n`)
            return res.status(200).json({
                success: true,
                message: "Development mode - code returned directly",
                email: email,
                devMode: true,
                code: code  // Only returned in development!
            })
        }

        // In production, send real email
        const emailSent = await sendVerificationEmail(email, code, first_name)

        if (!emailSent) {
            console.log(`\n========================================`)
            console.log(`VERIFICATION CODE for ${email}: ${code}`)
            console.log(`========================================\n`)
        }

        return res.status(200).json({
            success: true,
            message: emailSent
                ? "Verification code sent to your email"
                : "Email failed - check server logs for code",
            email: email,
            devMode: false
        })
    } catch (error: any) {
        console.error("Registration error:", error)
        return res.status(500).json({ error: error.message || "Registration failed" })
    }
}
