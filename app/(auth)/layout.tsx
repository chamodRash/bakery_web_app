import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-center">
      <Image
        src={"/auth_bg.png"}
        width={1000}
        height={1000}
        alt={"background img"}
        className={"w-full h-full object-cover absolute left-0 top-0 -z-40"}
      />
      <div className="w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
