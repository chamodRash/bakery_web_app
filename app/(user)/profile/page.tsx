import { MyProfile } from "@/components/my-profile";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  return (
    <div className="w-11/12 mt-10 mx-auto h-screen flex gap-x-10">
      <div className="w-1/3 flex flex-col gap-y-5">
        <h2 className="text-2xl font-bold text-primary mt-10">My Profile</h2>
        <Button variant={"secondary"}>Profile</Button>
        <Button variant={"secondary"}>Orders</Button>
      </div>
      <MyProfile />
    </div>
  );
};

export default UserProfile;
