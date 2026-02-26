"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Sun, Moon, Sunrise, Cloud } from "lucide-react";

export default function WelcomeTimeGreeting() {
  const hour = new Date().getHours();

  const getGreeting = () => {
    if (hour < 6) {
      return {
        icon: <Moon className="w-6 h-6 text-blue-500" />,
        text: "夜深了，注意休息哦！",
      };
    } else if (hour < 12) {
      return {
        icon: <Sunrise className="w-6 h-6 text-orange-500" />,
        text: "早上好！新的一天开始了",
      };
    } else if (hour < 18) {
      return {
        icon: <Sun className="w-6 h-6 text-yellow-500" />,
        text: "下午好！有什么可以帮助你的吗？",
      };
    } else {
      return {
        icon: <Cloud className="w-6 h-6 text-indigo-500" />,
        text: "晚上好！今天过得怎么样？",
      };
    }
  };

  const greeting = getGreeting();

  return <WelcomeMessage icon={greeting.icon} text={greeting.text} />;
}
