import { CircleCheckBig } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/10 rounded-md p-3 flex items-center gap-x-3 text-sm text-emerald-500">
      <CircleCheckBig className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
