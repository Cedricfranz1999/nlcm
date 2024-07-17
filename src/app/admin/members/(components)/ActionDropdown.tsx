import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { EllipsisVertical, Trash, Eye, Bolt } from "lucide-react";
import { useNavigation } from "react-day-picker";
import { useRouter } from "next/navigation";

export function DropdownMenuDemo({ id }: { id: number }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="  w-32">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/admin/members/profile/${id}`)}
        >
          view more
          <DropdownMenuShortcut>
            <Eye size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/members/edit/${id}`)}
        >
          Edit
          <DropdownMenuShortcut>
            <Bolt size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>
            <Trash size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
