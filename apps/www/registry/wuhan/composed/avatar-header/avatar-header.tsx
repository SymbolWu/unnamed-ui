"use client";

import * as React from "react";
import {
  AvatarHeader,
  Avatar,
  AvatarName,
  AvatarTime,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";

export interface AvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  avatar?: React.ReactNode;
  name: React.ReactNode;
  time?: React.ReactNode;
}

export function AvatarHeaderComposed({
  avatar,
  name,
  time,
  className,
  ...props
}: AvatarHeaderProps) {
  return (
    <AvatarHeader className={className} {...props}>
      {avatar ?? <Avatar aria-hidden="true" />}
      <AvatarName>{name}</AvatarName>
      {time != null && <AvatarTime>{time}</AvatarTime>}
    </AvatarHeader>
  );
}
