"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { getSessionUser } from "@/data/sessionUser";
import { ViewProfile } from "./view-profile";
import { EditProfile } from "./edit-profile";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ChangePhoneNumber } from "./change-phone";
import { ChangePassword } from "./change-password";

export const MyProfile = () => {
  const supabase = createClient();
  const [user, setUser] = useState<any>({});

  const getUserDetails = useCallback(async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const phone = `0${user?.phone?.slice(2)}`;

    let { data: profiles, error: dbError } = await supabase
      .from("profiles")
      .select("*")
      .eq("phone", phone);

    if (profiles && profiles.length > 0) {
      setUser(profiles[0]);
    }
  }, [supabase]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails, user]);

  return (
    <div className="w-full">
      <ViewProfile
        name={user.name}
        phone={user.phone}
        address={user.address}
        loyaltypoints={user.loyaltypoints}
      />
      <div className="mt-10 w-full flex items-center justify-center gap-x-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"secondary"}>
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <EditProfile
              name={user.name}
              phone={user.phone}
              address={user.address}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"secondary"}>
              Change Phone Number
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ChangePhoneNumber id={user.id} phone={user.phone} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"secondary"}>
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ChangePassword id={user.id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
