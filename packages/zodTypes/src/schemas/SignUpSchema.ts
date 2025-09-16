import z from "zod";

export const signUpSchema = z.object({
  email: z.email({ message: "Please provide a valid email." }),

  name: z
    .string()
    .min(3, { message: "Please enter a name with atleast 3 characters" })
    .max(100),

  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be atleast 8 character long and contain atleast 1 number, 1 letter and one special character",
    ),
});
