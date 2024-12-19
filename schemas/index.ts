import { describe } from "node:test";
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

// export const AdminRegisterSchema = z.object();

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

export const orderFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
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
  note: z.string().optional(), // Optional field
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
  paymentMethod: z.enum(["cash", "card"], {
    required_error: "Payment method is required",
  }),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const addCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  description: z.string().min(1, {
    message: "Description is Required",
  }),
  slug: z.string().min(1, {
    message: "Slug is Required",
  }),
  img: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PNG, JPG, JPEG"),
});

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  price: z.number().min(1, {
    message: "Price is Required",
  }),
  description: z.string().min(1, {
    message: "Description is Required",
  }),
  qty: z.number().min(1, {
    message: "Quantity is Required",
  }),
  slug: z.string().min(1, {
    message: "Slug is Required",
  }),
  status: z.string().min(1, {
    message: "Status is Required",
  }),
  img: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PNG, JPG, JPEG"),
  categorySlug: z.string().min(1, {
    message: "Category is Required",
  }),
});

export const stockSchema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  qty: z.preprocess(
    (value) => (value ? Number(value) : undefined),
    z.number().min(1, {
      message: "Quantity is Required",
    })
  ),
  qty_unit: z.string().min(1, {
    message: "Quantity Unit is Required",
  }),
});

export const phoneNumberSchema = z.object({
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
});
