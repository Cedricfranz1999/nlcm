import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface RadioButtonProps {
  field: any;
}

const RadioButton = ({ field }: RadioButtonProps) => {
  return (
    <RadioGroup
      {...field}
      defaultValue=""
      value={field.value}
      onValueChange={field.onChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="MALE" id="r1" />
        <Label htmlFor="r1">MALE</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="FEMALE" id="r2" />
        <Label htmlFor="r2">FEMALE</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioButton;
