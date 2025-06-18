import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ✅ Secure authentication system
export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET!
  private static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL!
  private static readonly ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!

  static async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.ADMIN_PASSWORD_HASH)
  }

  static generateToken(email: string): string {
    return jwt.sign({ email, role: "admin" }, this.JWT_SECRET, { expiresIn: "24h" })
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET)
    } catch {
      return null
    }
  }
}
