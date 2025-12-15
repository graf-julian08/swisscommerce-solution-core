import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

// Simple hash function for password (use bcrypt in production!)
function simpleHash(password: string): string {
    // This is NOT secure - for production use bcrypt!
    let hash = 0
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return `sh_${Math.abs(hash).toString(36)}`
}

// Verify password against stored hash
export function verifyPasswordHash(password: string, storedHash: string): boolean {
    return simpleHash(password) === storedHash
}

// Create hash for storing
export function createPasswordHash(password: string): string {
    return simpleHash(password)
}

// POST /store/auth/login - Login endpoint
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const { email, password } = req.body as { email: string; password: string }

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    const emailLower = email.toLowerCase().trim()

    try {
        // Find customer by email
        const customerModule = req.scope.resolve(Modules.CUSTOMER)
        const customers = await customerModule.listCustomers({ email: emailLower })

        if (customers.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const customer = customers[0]

        // Check if customer has password in metadata
        const storedHash = customer.metadata?.password_hash as string

        if (!storedHash) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        // Verify password
        if (!verifyPasswordHash(password, storedHash)) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        return res.status(200).json({
            success: true,
            customer: {
                id: customer.id,
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name
            }
        })
    } catch (error: any) {
        console.error("Login error:", error)
        return res.status(401).json({ error: "Invalid email or password" })
    }
}
