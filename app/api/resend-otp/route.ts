import { resendOTP } from "@/actions/register";
import { NextApiRequest, NextApiResponse } from "next";

interface ResendOTPRequest extends NextApiRequest {
  body: {
    phone: string;
  };
}

interface ResendOTPResponse {
  success?: string;
  error?: string;
}

export default async function handler(
  req: ResendOTPRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    const result: ResendOTPResponse = await resendOTP(phone);
    if (result?.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ success: result.success });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
