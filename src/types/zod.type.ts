import { object, string, z } from "zod"

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
})

export type SingFormType = z.infer<typeof signInSchema>