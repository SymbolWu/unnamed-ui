"use client";

import * as React from "react";
import { InterveneForm } from "@/registry/wuhan/blocks/intervene-form/intervene-form-01";

export interface InterveneFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function InterveneFormComposed({
  className,
  ...props
}: InterveneFormProps) {
  return <InterveneForm className={className} {...props} />;
}
