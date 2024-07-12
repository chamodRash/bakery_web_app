import * as z from "zod";

export const LoginSchema = z.object({
  phone: z
    .string({
      required_error: "Phone Number is required",
    })
    .length(10, {
      message: "Phone Number should have 10 digits",
    })
    .startsWith("07", {
      message: "Phone Number should be 07xxxxxxxx",
    }),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  phone: z
    .string({
      required_error: "Phone Number is required",
    })
    .length(10, {
      message: "Phone Number should have 10 digits",
    })
    .startsWith("07", {
      message: "Phone Number should be 07xxxxxxxx",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 characters Required",
  }),
});
