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

const SelectMaritalStatus = ({
  status,
  field,
}: {
  status: string;
  field: any;
}) => {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> Marital status</SelectLabel>
          <SelectItem value="SINGLE">SINGLE</SelectItem>
          <SelectItem value="MARRIED">MARRIED</SelectItem>
          <SelectItem value="WINDOWED">WINDOWED</SelectItem>
          <SelectItem value="DIVORCED">DIVORCED</SelectItem>
          <SelectItem value="SEPARATED">SEPARATED</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMaritalStatus;
