import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const SelectMaritalStatus = () => {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select marital status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Blood Type</SelectLabel>
          <SelectItem value="A">SINGLE</SelectItem>
          <SelectItem value="B">MARRIED</SelectItem>
          <SelectItem value="AB">WINDOWED</SelectItem>
          <SelectItem value="O">DIVORCED</SelectItem>
          <SelectItem value="O">SEPARATED</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMaritalStatus;
