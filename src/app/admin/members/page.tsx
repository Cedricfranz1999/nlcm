"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { ImageOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DropdownMenuDemo } from "./(components)/ActionDropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import PopoverViewImage from "./(components)/popoverViewImage";
import { number } from "zod";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data, refetch } = api.members.getAllmembers.useQuery();

  return (
    <div className="max-h-[850px] overflow-scroll">
      <Button
        className=" float-right   my-5"
        onClick={() => router.push("/admin/members/add")}
      >
        Add Members
      </Button>
      <Table>
        <TableCaption>A list of NLCM members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Image</TableHead>
            <TableHead className="text-start">Firstname</TableHead>
            <TableHead className="text-start">MiddleName</TableHead>
            <TableHead className="text-start">LastName</TableHead>
            <TableHead className="text-start">Gender</TableHead>
            <TableHead className=" text-start ">Present Address</TableHead>
            <TableHead className=" text-start ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((members) => (
            <TableRow key={members.id}>
              <TableCell className="font-medium">
                {members.image ? (
                  <PopoverViewImage avatar={members.image} />
                ) : (
                  <ImageOff />
                )}
              </TableCell>

              <TableCell className="font-medium">{members.lastName}</TableCell>

              <TableCell className="font-medium">{members.firstName}</TableCell>
              <TableCell className="font-medium">
                {members.middleName}
              </TableCell>
              <TableCell className="font-medium">{members.sex}</TableCell>

              <TableCell className="font-medium">
                {members.presentAddress}
              </TableCell>
              <TableCell className=" text-start">
                <DropdownMenuDemo id={members.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default page;
