import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex flex-col gap-y-10">
      <Skeleton className="rounded-lg w-11/12 mx-auto h-96" />
      <Skeleton className="rounded-lg w-11/12 mx-auto h-56" />
    </div>
  );
}
