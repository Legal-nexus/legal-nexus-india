
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-1/3">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">Aarav Joshi</h2>
              <p className="text-muted-foreground">Senior Advocate</p>
              <p className="text-sm text-muted-foreground mt-1">Delhi High Court</p>
              
              <div className="w-full mt-6">
                <div className="flex justify-between items-center py-2 border-t">
                  <span className="text-sm">Member since</span>
                  <span className="text-sm font-medium">January 2025</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t">
                  <span className="text-sm">Cases saved</span>
                  <span className="text-sm font-medium">27</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t">
                  <span className="text-sm">Research hours</span>
                  <span className="text-sm font-medium">142</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Change Avatar</Button>
            </CardFooter>
          </Card>

          <div className="md:w-2/3">
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Aarav" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Joshi" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="aarav.joshi@legalnexus.in" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bar">Bar Registration Number</Label>
                      <Input id="bar" defaultValue="D/1234/2020" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="practice">Area of Practice</Label>
                      <Input id="practice" defaultValue="Constitutional Law, Criminal Law" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your research experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                      </div>
                      <Switch id="darkMode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="language">Default Language</Label>
                        <p className="text-sm text-muted-foreground">Set your preferred language for case searches</p>
                      </div>
                      <select className="p-2 border rounded">
                        <option>English</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="court">Default Court</Label>
                        <p className="text-sm text-muted-foreground">Set your default court for research</p>
                      </div>
                      <select className="p-2 border rounded">
                        <option>All Courts</option>
                        <option>Supreme Court</option>
                        <option>Delhi High Court</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="citations">Show Citations</Label>
                        <p className="text-sm text-muted-foreground">Show citation formatting in case results</p>
                      </div>
                      <Switch id="citations" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifs">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about case updates via email</p>
                      </div>
                      <Switch id="emailNotifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newCases">New Case Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get alerts when similar cases are added</p>
                      </div>
                      <Switch id="newCases" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="citations">Citation Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get alerted when saved cases are cited</p>
                      </div>
                      <Switch id="citations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="digest">Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary of legal updates</p>
                      </div>
                      <Switch id="digest" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? "Saving..." : "Save Notification Settings"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
