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
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
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
    password: z
      .string()
      .min(6, {
        message: "Minimum 6 characters Required",
      })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    code: z.optional(z.string()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const OTPSchema = z.object({
  code: z
    .string()
    .length(6, {
      message: "OTP should have 6 digits",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  phone: z.optional(z.string()),
  address: z.string().min(1, {
    message: "Address is Required",
  }),
});

export const ChangePhoneSchema = z.object({
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
  code: z.optional(z.string()),
});

export const ChangePasswordSchema = z
  .object({
    id: z.string(),
    newPassword: z.optional(
      z
        .string()
        .min(6, {
          message: "Minimum 6 characters Required",
        })
        .regex(/[a-zA-Z]/, {
          message: "Password must contain at least one letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
    ),
    confirmNewPassword: z.optional(z.string()),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
  });
