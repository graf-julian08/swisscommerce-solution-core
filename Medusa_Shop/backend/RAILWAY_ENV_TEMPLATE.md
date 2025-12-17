# Medusa Backend Environment Variables
# Copy this to .env and fill in the values

# Database (PostgreSQL from Railway or Neon)
DATABASE_URL="postgresql://user:password@host:5432/medusa"

# CORS Settings
STORE_CORS="https://aproteatelier.com,https://*.aproteatelier.com"
ADMIN_CORS="https://api.aproteatelier.com"
AUTH_CORS="https://aproteatelier.com,https://*.aproteatelier.com,https://api.aproteatelier.com"

# JWT Secrets (generate random strings!)
JWT_SECRET="your-super-secret-jwt-key-change-me"
COOKIE_SECRET="your-super-secret-cookie-key-change-me"

# Stripe (optional, for payments)
# STRIPE_API_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."

# Medusa Admin
# MEDUSA_ADMIN_ONBOARDING_TYPE="default"

# Redis (optional, for production)
# REDIS_URL="redis://..."
