import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
interface ChildrenPopoverProps {
  children: string[];
  parents: {
    firstname: string;
    lastname: string;
  };
}
import { Circle } from "lucide-react";
import { Children } from "react";
const ChildrenPopover: React.FC<ChildrenPopoverProps> = (
  { children },
  parentName,
) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children.length === 0 ? null : (
          <Button variant="outline">Children {children.length}</Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Cedric Franz M Candido</h4>
            <p className="text-sm text-muted-foreground">list of Children</p>
          </div>
          <div className="grid gap-2">
            <div className=" flex flex-col gap-3">
              {children.map((data) => {
                return (
                  <div className=" flex items-center justify-start gap-3 ">
                    {" "}
                    <Circle size={10} /> {data}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChildrenPopover;
