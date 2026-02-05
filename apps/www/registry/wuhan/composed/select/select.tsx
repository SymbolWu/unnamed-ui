import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  SelectTriggerPrimitive,
  SelectItemPrimitive,
} from "@/registry/wuhan/blocks/select/select-01";
import { SelectContent } from "@/registry/wuhan/ui/select";

const SelectRoot = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
export interface SelectProps {
  children?: React.ReactNode;
  className?: string;
}

export function Select({ children, className }: SelectProps) {
  return (
    <div>
      <SelectRoot>
        <SelectTriggerPrimitive>
          <SelectValue placeholder="Select an option" />
        </SelectTriggerPrimitive>
        <SelectContent>
          <SelectItemPrimitive value="option1" className={className}>
            Test1
          </SelectItemPrimitive>
          <SelectItemPrimitive value="option2" className={className}>
            Test2
          </SelectItemPrimitive>
          <SelectItemPrimitive value="option3" className={className}>
            Test3
          </SelectItemPrimitive>
          <SelectItemPrimitive value="option4" className={className}>
            Test4
          </SelectItemPrimitive>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
