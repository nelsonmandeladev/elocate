import { object, string, z, number } from "zod"

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
});
export type SingFormType = z.infer<typeof signInSchema>;


export const createLocationSchema = object({
    formatted_address: string({ required_error: "key_required_field" })
        .min(1, "key_required_field"),
    description: string({ required_error: "key_required_field" })
        .min(1, "key_required_field"),
});

export type CreateLocationFormType = z.infer<typeof createLocationSchema>;