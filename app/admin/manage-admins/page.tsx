"use client";

import AddAdminForm from "@/components/admin/add-admin";
import { Button } from "@/components/ui/button";

const ManageAdminsPage = () => {
  return (
    <div className="w-full">
      <div className="w-full px-10 py-3 flex items-center justify-center bg-secondary">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-lg text-zinc-700">Manage Admins</h3>
          <AddAdminForm>
            <Button>Add Admins</Button>
          </AddAdminForm>
        </div>
      </div>
    </div>
  );
};

export default ManageAdminsPage;
