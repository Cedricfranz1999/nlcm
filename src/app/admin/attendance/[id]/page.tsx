"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { MultiSelect } from "~/components/ui/multi-select";
import { api } from "~/trpc/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";
import { useState ,useEffect} from "react";



const Page = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: getAttendance,
    isLoading,
    refetch: refetchAttendance,
  } = api.attendance.getAttendanceMemberInSelectedDate.useQuery({
    attendanceId: parseInt(params.id),
    search: search,
  });

  const defaultValue =
    getAttendance?.map((data) => {
      return String(data.member.id);
    }) ?? [];
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data: allMembers, refetch } = api.attendance.getAllmembers.useQuery();

  const { data: getDate } = api.attendance.getAttendanceSpecificDate.useQuery({
    attendanceId: parseInt(params.id),
  });

  const data = allMembers?.map((data: any) => {
    return {
      label: (
        <div className="  flex  w-full items-center  justify-between py-1  ">
          <Label className=" font-sans   text-sm">
            {" "}
            {data.firstName} {data.middleName} {data.lastName}
          </Label>
        </div>
      ),
      button: (
        <div className="  flex  w-full items-center  justify-between py-1  ">
          <Link href={`/admin/members/profile/${data.id}`} target="_blank">
            <Button size={"sm"} className="  z-50  h-7 w-20 text-xs">
              Show info
            </Button>
          </Link>
        </div>
      ),

      value: String(data.id),
    };
  });
  const addAttendance = api.attendance.addMembersInAttendance.useMutation({
    onSuccess:  async () => {
      toast({
        title: "Successfully added new atteandance",
      });
    await  refetch();
    },
  });

  const handleSubmit1 = async () => {
    setIsPopoverOpen(false);
    await addAttendance.mutateAsync({
      data: selectedValues.map((data) => {
        return { memberId: parseInt(data), attendanceId: parseInt(params.id) };
      }),
      attendanceId: parseInt(params.id),
    });
    await refetchAttendance();
  };
  useEffect(() => {
    setSelectedValues(defaultValue);
  }, [isPopoverOpen]);

  return (
    <>
      {isLoading ? (
        <div className=" flex h-screen w-full items-center justify-center">
          <p>loading....</p>
        </div>
      ) : (
        <div className="  flex h-screen w-full flex-col items-start  justify-start p-10">
          <div className=" flex w-full items-center justify-between ">
            <div className="       mb-10  rounded-md bg-teal-700 text-white">
              <MultiSelect
                options={data ?? []}
                defaultValue={defaultValue}
                onValueChange={(value: string[]) => {}}
                onSubmit1={handleSubmit1}
                isPopoverOpen={isPopoverOpen}
                setIsPopoverOpen={setIsPopoverOpen}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
              />
            </div>
            <Badge className=" mb-20 text-2xl">
              {getDate
                ? format(new Date(getDate.date), "MMMM dd, yyyy")
                : "Date not available"}
            </Badge>
          </div>

          <Input
            className="  my-4 mb-3  mt-14 w-72"
            placeholder=" search members"
            value={search}
          ></Input>

          <Table>
            <TableCaption>A list attendance of members.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Firstname</TableHead>
                <TableHead>Middlename</TableHead>
                <TableHead>Lastname</TableHead>
                <TableHead>Time</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAttendance?.map((atteandance) => (
                <TableRow key={atteandance?.member.id}>
                  <TableCell className="font-medium">
                    {atteandance?.member.firstName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {atteandance?.member.middleName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {atteandance?.member.lastName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {atteandance?.createdAt
                      ? format(new Date(atteandance.createdAt), "hh:mm a")
                      : ""}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/members/profile/${atteandance.member.id}`}
                      target="_blank"
                    >
                      {" "}
                      <Button
                        size={"sm"}
                        className=" bg-teal-800   hover:bg-teal-600"
                      >
                        show more info
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Page;
