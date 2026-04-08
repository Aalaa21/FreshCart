import * as zod from 'zod';

export const registerSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password: zod.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        , "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: zod.string().nonempty("Please confirm your password"),
    phone: zod.string().nonempty("Phone number is required").regex(/^01[0125]\d{8}$/, "Invalid phone number format"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
})

export type RegisterSchemaType = zod.infer<typeof registerSchema>;