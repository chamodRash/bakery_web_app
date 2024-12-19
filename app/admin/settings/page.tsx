"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminSettingsPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const [admins, setAdmins] = useState<any>();
  const [notifications, setNotifications] = useState(true);
  const [colorTheme, setColorTheme] = useState("blue");

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
      <div className="fixed top-0 left-5 w-full px-10 py-3 flex items-center justify-center bg-secondary">
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
      <div className="grid grid-cols-2 gap-6 bg-secondary p-10 pt-20">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your bakery&#39;s general settings and information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="bakeryName">Bakery Name</Label>
              <Input id="bakeryName" defaultValue="Our Bakery" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bakeryDescription">Bakery Description</Label>
              <Textarea
                id="bakeryDescription"
                defaultValue="We bake with love and passion."
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bakeryAddress">Bakery Address</Label>
              <Input
                id="bakeryAddress"
                defaultValue="123 Bakery Street, Cityville"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bakeryPhone">Bakery Phone</Label>
              <Input id="bakeryPhone" defaultValue="+1 (123) 456-7890" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your bakery website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="colorTheme">Color Theme</Label>
              <Select value={colorTheme} onValueChange={setColorTheme}>
                <SelectTrigger id="colorTheme">
                  <SelectValue placeholder="Select a color theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Ocean Blue</SelectItem>
                  <SelectItem value="green">Forest Green</SelectItem>
                  <SelectItem value="purple">Royal Purple</SelectItem>
                  <SelectItem value="red">Crimson Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="font">Font</Label>
              <Select>
                <SelectTrigger id="font">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans">Sans-serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Homepage Settings</CardTitle>
            <CardDescription>
              Manage the content and media displayed on your homepage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input id="heroTitle" defaultValue="Fresh Baked Goodness" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="heroDescription">Hero Description</Label>
                <Textarea
                  id="heroDescription"
                  defaultValue="Discover our artisanal breads and pastries, baked fresh daily."
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="heroImage">Hero Image</Label>
              <Input id="heroImage" type="file" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="featuredProducts">Featured Products</Label>
              <Select>
                <SelectTrigger id="featuredProducts">
                  <SelectValue placeholder="Select featured products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bread">Artisan Breads</SelectItem>
                  <SelectItem value="pastries">Pastries</SelectItem>
                  <SelectItem value="cakes">Cakes</SelectItem>
                  <SelectItem value="seasonal">Seasonal Specials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
