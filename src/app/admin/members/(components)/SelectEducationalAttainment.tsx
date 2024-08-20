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

const SelectEducationAttainment = ({
  attainment,
  field,
}: {
  attainment: string;
  field: any;
}) => {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={attainment} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> Marital status</SelectLabel>
          <SelectItem value="PRESCHOOL">PRESCHOOL</SelectItem>
          <SelectItem value="ELEMENTARY">ELEMENTARY</SelectItem>
          <SelectItem value="HIGHSCHOOL">HIGHSCHOOL</SelectItem>
          <SelectItem value="SENIORHIGH">SENIORHIGH</SelectItem>
          <SelectItem value="COLLEGE">COLLEGE</SelectItem>
          <SelectItem value="DEGREE_HOLDER">DEGREE_HOLDER</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectEducationAttainment;
