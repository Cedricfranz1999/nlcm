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

const SelectDropdownBloodType = ({
  blood,
  field,
}: {
  blood: string;
  field: any;
}) => {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={blood} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Blood Type</SelectLabel>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="AB">AB</SelectItem>
          <SelectItem value="O">O</SelectItem>
          <SelectItem value="A+">A+</SelectItem>
          <SelectItem value="A-">A-</SelectItem>
          <SelectItem value="B+">B+</SelectItem>
          <SelectItem value="B-">B-</SelectItem>
          <SelectItem value="AB+">AB+</SelectItem>
          <SelectItem value="AB-">AB-</SelectItem>
          <SelectItem value="O+">O+</SelectItem>
          <SelectItem value="O-">O-</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropdownBloodType;
