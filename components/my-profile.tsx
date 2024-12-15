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
import { UserProps } from "@/data/types";

interface MyProfileProps {
  userData: UserProps;
}

export const MyProfile = ({ userData }: MyProfileProps) => {
  return (
    <div className="w-full">
      <ViewProfile
        name={userData.name}
        phone={userData.phone}
        address={userData.address}
        loyaltypoints={userData.loyaltypoints}
      />
      <div className="mt-10 w-full flex items-center justify-center gap-x-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"default"}>
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <EditProfile
              name={userData.name}
              phone={userData.phone}
              address={userData.address}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"default"}>
              Change Phone Number
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ChangePhoneNumber id={userData.id} phone={userData.phone} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-56" variant={"default"}>
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ChangePassword id={userData.id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
