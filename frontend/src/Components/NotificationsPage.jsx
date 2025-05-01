import React, { useState } from "react";
import NavBar from "./NavigationBar";
import ProfileCard from "./ProfileCard";
import {
  HeartFilled,
  MessageFilled,
  UserAddOutlined,
} from "@ant-design/icons";

const mockNotifications = [
  {
    id: 1,
    type: "comment",
    message: " mentioned you in a comment.",
    time: "1h",
    sender: {
      name: "Anushanga Kaushan",
      avatar: "/your-profile-images/avatar1.jpeg",
    },
  },
  {
    id: 2,
    type: "like",
    message: " reacted to your post.",
    time: "3h",
    sender: {
      name: "Nayana Bandara",
      avatar: "/your-profile-images/avatar2.jpeg",
    },
  },
  {
    id: 3,
    type: "follow",
    message: " followed you.",
    time: "3h",
    sender: {
      name: "Rivishan Lakshitha",
      avatar: "/your-profile-images/avatar3.jpeg",
    },
  },
];

function findNotificationByUserId(userId) {
  return mockNotifications.find(
    (notification) => notification.sender.id === userId
  );
}

// Example usage (uncomment to use):
// const notification = findNotificationByUserId("someUserId");

function getNotificationIcon(type) {
  const baseClass =
    "flex items-center justify-center w-7 h-7 rounded-full"; // circle, center icon, fixed size
  switch (type) {
    case "like":
      return (
        <div className={`${baseClass} bg-pink-600`}>
          <HeartFilled className="text-white text-base" />
        </div>
      );
    case "comment":
      return (
        <div className={`${baseClass} bg-green-500`}>
          <MessageFilled className="text-white text-base" />
        </div>
      );
    case "follow":
      return (
        <div className={`${baseClass} bg-blue-600`}>
          <UserAddOutlined className="text-white text-base" />
        </div>
      );
    default:
      return null;
  }
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <NavBar />
      <div className="mt-10 mx-6 flex flex-row gap-10">
        <ProfileCard />
        <div className="w-full bg-white rounded-lg shadow-lg p-4 pt-14 sticky top-24 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-500 font-semibold ">Notifications</h2>
          <hr className="mb-6 border-blue-200" />
          <ul className="list-none p-0">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-center justify-between mb-3 p-4 rounded ${
                  notification.read ? "bg-gray-100" : "bg-blue-100"
                }`}              >
                <div className="flex items-center">
                  {/* Avatar with icon overlay */}
                  <div className="relative mr-4">
                    <img
                      src={notification.sender.avatar}
                      alt={notification.sender.name}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                    <div className="absolute bottom-0 right-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">
                      <span className="font-semibold">{notification.sender.name}</span>
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-300">{notification.time}</p>
                  </div>
                </div>
                {!notification.read && (
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded hover:bg-blue-200 transition text-xs font-medium"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <span className="material-icons text-base">Mark as read</span>
                    
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
