"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeMessage
        icon={
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
        }
        text={
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            你好！我是 AI 助手，有什么可以帮你的吗？
          </motion.p>
        }
      />
    </motion.div>
  );
}
