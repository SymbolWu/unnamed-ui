"use client";

import * as React from "react";
import {
  WelcomeContainer,
  WelcomeIcon,
  WelcomeText,
} from "@/registry/wuhan/blocks/welcome/welcome-01";

export interface WelcomeProps {
  icon?: React.ReactNode;
  text: React.ReactNode;
  className?: string;
}

export function WelcomeMessage({ icon, text, className }: WelcomeProps) {
  return (
    <WelcomeContainer className={className}>
      {icon && <WelcomeIcon>{icon}</WelcomeIcon>}
      <WelcomeText>{text}</WelcomeText>
    </WelcomeContainer>
  );
}
