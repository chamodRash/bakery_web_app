"use server";

import { MyProfile } from "@/components/my-profile";
import { Button } from "@/components/ui/button";
import { getUserByid } from "@/data/user";
import { createClient } from "@/utils/supabase/server";

const UserProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const userDetails = (await getUserByid(user?.id))[0];

  return (
    <div className="w-11/12 mt-10 mx-auto h-screen">
      <h2 className="text-2xl font-bold text-primary mt-16 mb-10 text-center">
        My Profile
      </h2>
      {/* <div className="w-1/3 flex flex-col gap-y-5">
        <Button variant={"secondary"}>Profile</Button>
        <Button variant={"secondary"}>Orders</Button>
      </div> */}
      <div className="w-10/12 mx-auto">
        <MyProfile userData={userDetails} />
      </div>
    </div>
  );
};

export default UserProfile;
