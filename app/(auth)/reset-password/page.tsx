"use client";

import {
  checkUserExists,
  sendOtp,
  validateOtp,
  updatePassword,
} from "@/actions/reset-password";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { phoneNumberSchema } from "@/schemas";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const phoneForm = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handlePhoneNumberSubmit = async () => {
    try {
      const result = await checkUserExists(phoneNumber);
      if (result.error) {
        toast.error(result.error);
      }
      await sendOtp(phoneNumber);
      setStep(2);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const isValidOtp = await validateOtp(Number(otp));
      if (isValidOtp.error) {
        toast.error(isValidOtp.error);
      }
      setStep(3);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      await updatePassword(newPassword);
      toast.success("Password updated successfully");
      setStep(1);
      setPhoneNumber("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <CardWrapper
      headerLabel={"Reset Password"}
      backButtonLabel={"Login Here."}
      backButtonHref={"/login"}>
      {step === 1 && (
        <div>
          <h2>Enter the Phone Number</h2>
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
          />
          <Button onClick={handlePhoneNumberSubmit}>Submit</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter the OTP sent to your phone</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleOtpSubmit}>Submit</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Enter your new password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            title="New Password"
            placeholder="Enter New Password"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}
    </CardWrapper>
  );
};

export default ResetPasswordPage;
