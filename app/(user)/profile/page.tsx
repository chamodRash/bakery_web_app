import { MyOrders } from "@/components/my-orders";
import { MyProfile } from "@/components/my-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
  return (
    <Tabs defaultValue="profile" className="w-full rounded-xl">
      <TabsList>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="orders">My Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <MyProfile />
      </TabsContent>
      <TabsContent value="orders">
        <MyOrders />
      </TabsContent>
    </Tabs>
  );
};

export default UserProfile;
