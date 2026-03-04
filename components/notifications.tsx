"use client"

import { useState } from "react"
import { Bell, CheckCheck, User, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "task" | "mention"
  title: string
  message: string
  timestamp: string
  read: boolean
  projectName?: string
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New Task Assignment",
    message: "You have been assigned to verify ARC compliance for Landing Gear components",
    timestamp: "2 minutes ago",
    read: false,
    projectName: "EFW A321-200 P2F Redelivery",
  },
  {
    id: "2",
    type: "mention",
    title: "Mentioned in Chat",
    message: "Sarah Chen mentioned you in Folder K - Landing Gear discussion",
    timestamp: "15 minutes ago",
    read: false,
    projectName: "EFW A321-200 P2F Redelivery",
  },
  {
    id: "3",
    type: "task",
    title: "Task Assignment",
    message: "You have been assigned to review MPD interval compliance checks",
    timestamp: "1 hour ago",
    read: false,
    projectName: "Boeing 737-800 Lease Return",
  },
  {
    id: "4",
    type: "mention",
    title: "Chat Mention",
    message: "Mike Johnson mentioned you regarding the DFP signature verification",
    timestamp: "2 hours ago",
    read: true,
    projectName: "A320neo Redelivery Project",
  },
  {
    id: "5",
    type: "task",
    title: "Task Completed",
    message: "Your assigned task for Hard Time Components verification has been approved",
    timestamp: "3 hours ago",
    read: true,
    projectName: "B777-300ER End of Lease",
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <User className="h-4 w-4 text-sky-600" />
      case "mention":
        return <MessageSquare className="h-4 w-4 text-emerald-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-base font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs">
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-2 p-3 cursor-pointer ${
                  !notification.read ? "bg-sky-50 hover:bg-sky-100" : "hover:bg-gray-50"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-sky-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                    {notification.projectName && (
                      <p className="text-xs text-sky-600 mt-1 font-medium">{notification.projectName}</p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
