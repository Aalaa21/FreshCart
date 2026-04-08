import * as zod from 'zod';

export const loginSchema = zod.object({
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password: zod.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
})
export type LoginSchemaType = zod.infer<typeof loginSchema>;