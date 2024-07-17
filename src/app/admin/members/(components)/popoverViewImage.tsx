import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
interface PopoverViewImageProps {
  avatar: string;
}
const PopoverViewImage = ({ avatar }: PopoverViewImageProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img height={30} width={30} className=" cursor-pointer" src={avatar} />
      </PopoverTrigger>
      <PopoverContent className=" w-96">
        <img className=" h-full w-full" src={avatar} />
      </PopoverContent>
    </Popover>
  );
};

export default PopoverViewImage;
