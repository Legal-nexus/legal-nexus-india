
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "update" | "alert" | "info";
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Supreme Court Judgment",
      message: "A new judgment in the case of Sharma vs. State of Rajasthan has been added to the database.",
      date: "2025-05-02",
      read: false,
      type: "update"
    },
    {
      id: "2",
      title: "Similar Case Found",
      message: "Our system has found 3 new cases similar to your saved case 'Kumar vs Delhi Municipal'",
      date: "2025-05-01",
      read: false,
      type: "alert"
    },
    {
      id: "3",
      title: "System Update",
      message: "Legal Nexus has been updated with new features including improved knowledge graph visualization.",
      date: "2025-04-30",
      read: true,
      type: "info"
    },
    {
      id: "4",
      title: "Citation Alert",
      message: "A case you're tracking has been cited in a recent High Court judgment.",
      date: "2025-04-28",
      read: true,
      type: "alert"
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case "update": return "bg-blue-100 text-blue-800";
      case "alert": return "bg-red-100 text-red-800";
      case "info": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary">{unreadCount} new</Badge>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No notifications yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "bg-white" : "bg-blue-50 border-blue-200"}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {notification.title}
                        <Badge className={getBadgeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{notification.date}</CardDescription>
                    </div>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
