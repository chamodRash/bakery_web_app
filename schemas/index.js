import * as z from "zod";

export const LoginSchema = z.object({
  id: z.coerce
    .number({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a number",
    })
    .gte(7, {
      message: "Phone Number should have 7 digits",
    })
    .positive({
      message: "Phone Number can't be negative",
    }),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  id: z.coerce
    .number({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a number",
    })
    .gte(7, {
      message: "Phone Number should have 7 digits",
    })
    .positive({
      message: "Phone Number can't be negative",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 characters Required",
  }),
});
