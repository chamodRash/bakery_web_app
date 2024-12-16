"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const AdminSettingsPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const [admins, setAdmins] = useState<any>();

  useEffect(() => {
    const fetchAdmins = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setAdmins(user);
    };

    fetchAdmins();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full px-10 py-3 flex items-center justify-center bg-secondary">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-lg text-zinc-700">Admin Settings</h3>
          {admins?.user_metadata?.user_role === "MASTER" && (
            <Button
              onClick={() => {
                router.push("/admin/manage-admins");
              }}>
              Manage Admins
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
