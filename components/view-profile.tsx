interface ViewProfileUser {
  name: string;
  phone: string;
  address: string;
  loyaltypoints: number;
}

export const ViewProfile = ({
  name,
  phone,
  address,
  loyaltypoints,
}: ViewProfileUser) => {
  return (
    <div className="lg:w-full mx-auto flex flex-col gap-y-5 mt-10">
      <div className="flex items-center justify-between flex-row rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Name</p>
        <p className="truncate text-sm font-mono p-1 bg-slate-100 rounded-md">
          {name}
        </p>
      </div>
      <div className="flex items-center justify-between flex-row rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Phone Number</p>
        <p className="truncate text-sm font-mono p-1 bg-slate-100 rounded-md">
          {phone}
        </p>
      </div>
      <div className="flex items-center justify-between flex-row rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Address</p>
        <p className="truncate text-sm font-mono p-1 bg-slate-100 rounded-md">
          {address}
        </p>
      </div>
      <div className="flex items-center justify-between flex-row rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Loyalty Points</p>
        <p className="truncate text-sm font-mono p-1 bg-slate-100 rounded-md">
          {loyaltypoints}
        </p>
      </div>
    </div>
  );
};
