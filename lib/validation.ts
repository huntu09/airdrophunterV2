import { z } from "zod"

// Airdrop validation schema
export const airdropSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description too long"),
  action: z.string().min(1, "Action is required").max(200, "Action too long"),
  category: z.enum(["latest", "hottest", "potential"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  status: z.enum(["active", "confirmed", "upcoming", "ended"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    errorMap: () => ({ message: "Invalid difficulty" }),
  }),
  reward: z.string().optional(),
  startDate: z.string().optional(),
  logo: z.string().optional(),

  // Social links - handle individual fields from form
  website: z.string().url().optional().or(z.literal("")),
  telegram: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  discord: z.string().url().optional().or(z.literal("")),

  // About fields
  overview: z.string().optional(),
  tokenomics: z.string().optional(),
  roadmap: z.string().optional(),

  // Steps - handle individual step fields
  step1: z.string().optional(),
  step2: z.string().optional(),
  step3: z.string().optional(),
  step4: z.string().optional(),
  step5: z.string().optional(),
  step6: z.string().optional(),

  // Requirements - handle individual requirement fields
  req1: z.string().optional(),
  req2: z.string().optional(),
  req3: z.string().optional(),
  req4: z.string().optional(),
  req5: z.string().optional(),

  isHot: z.boolean().optional(),
  isConfirmed: z.boolean().optional(),
})

export type AirdropFormData = z.infer<typeof airdropSchema>

// Validation helper
export function validateAirdrop(data: any) {
  try {
    return {
      success: true,
      data: airdropSchema.parse(data),
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.reduce(
          (acc, err) => {
            const path = err.path.join(".")
            acc[path] = err.message
            return acc
          },
          {} as Record<string, string>,
        ),
      }
    }
    return {
      success: false,
      data: null,
      errors: { general: "Validation failed" },
    }
  }
}

// Search and filter validation
export const searchFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.enum(["all", "latest", "hottest", "potential"]).optional(),
  status: z.enum(["all", "active", "confirmed", "upcoming", "ended"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
})

export type SearchFilters = z.infer<typeof searchFiltersSchema>
