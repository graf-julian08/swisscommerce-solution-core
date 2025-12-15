import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { sendWelcomeEmail } from "../../../../services/email"
import { verificationCodes } from "../register/route"
import { createPasswordHash } from "../login/route"

// POST /store/auth/verify - Verify code and create account
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const { email, code } = req.body as { email: string; code: string }

    if (!email || !code) {
        return res.status(400).json({ error: "Email and code are required" })
    }

    const emailLower = email.toLowerCase()

    try {
        // Get stored verification data
        const stored = verificationCodes.get(emailLower)

        if (!stored) {
            return res.status(400).json({ error: "No pending verification found. Please register again." })
        }

        // Check if code expired
        if (new Date() > stored.expiresAt) {
            verificationCodes.delete(emailLower)
            return res.status(400).json({ error: "Verification code expired. Please register again." })
        }

        // Check if code matches
        if (stored.code !== code) {
            return res.status(400).json({ error: "Invalid verification code" })
        }

        const { userData } = stored

        // Hash password for storage
        const passwordHash = createPasswordHash(userData.password)

        // Create customer with password hash in metadata
        const customerModule = req.scope.resolve(Modules.CUSTOMER)
        const customer = await customerModule.createCustomers({
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            metadata: {
                verified: true,
                verified_at: new Date().toISOString(),
                password_hash: passwordHash  // Store hashed password
            }
        })

        // Clean up verification code
        verificationCodes.delete(emailLower)

        // Send welcome email (non-blocking)
        sendWelcomeEmail(userData.email, userData.first_name).catch(console.error)

        return res.status(200).json({
            success: true,
            message: "Account verified and created successfully",
            customer: {
                id: customer.id,
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name
            }
        })
    } catch (error: any) {
        console.error("Verification error:", error)
        return res.status(500).json({ error: error.message || "Verification failed" })
    }
}
