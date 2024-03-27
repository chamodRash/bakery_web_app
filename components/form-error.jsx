import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/10 rounded-md p-3 flex items-center gap-x-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
