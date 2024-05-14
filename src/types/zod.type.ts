import { object, string, z, number } from "zod"

export const signInSchema = object({
    email: string({ required_error: "key_email_required" })
        .min(1, "key_email_required")
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

export const stayConnectSchema = object({
    email: string({ required_error: "key_email_required" })
        .min(1, "key_email_required")
        .email("Invalid email"),
    message: string()
        .min(0)
})

export type StayConnectFormType = z.infer<typeof stayConnectSchema>;

export const contactSupportSchema = object({
    email: string({ required_error: "key_email_required" })
        .min(1, "key_email_required")
        .email("Invalid email"),
    message: string({ required_error: "key_required_field" })
        .min(1, "key_required_field")
})

export type ContactSupportFormType = z.infer<typeof contactSupportSchema>;