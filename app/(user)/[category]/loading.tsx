import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex flex-col gap-y-10">
      {/* <Skeleton className="w-full h-32" />
      <Skeleton className="rounded-lg w-11/12 mx-auto h-96 mt-8" />
      <div className="w-10/12 mx-auto flex gap-x-5 items-center justify-center">
        <Skeleton className="rounded-full w-36 h-36" />
        <Skeleton className="rounded-full w-36 h-36" />
        <Skeleton className="rounded-full w-36 h-36" />
        <Skeleton className="rounded-full w-36 h-36" />
        <Skeleton className="rounded-full w-36 h-36" />
        <Skeleton className="rounded-full w-36 h-36" />
      </div> */}

      <div className="w-10/12 mx-auto grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-x-10">
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
        <Skeleton className="rounded-lg w-[250px]" />
      </div>
    </div>
  );
}
