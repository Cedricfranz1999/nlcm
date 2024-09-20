"use client";

import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { format } from "date-fns"; // Import the format function from date-fns

// Define the type for the attendance data
interface AttendanceData {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  attendance: {
    attendance: {
      date: string;
    };
  }[];
}

const Page = ({ params }: { params: { slug: string } }) => {
  const { data, refetch } = api.dashboard.getData.useQuery<AttendanceData[]>({
    slug: params.slug,
  });

  return (
    <div>
      <Table>
        <TableCaption>A list of training of members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Middlename</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead className={data?.[0]?.attendance ? "" : "hidden"}>
              Last attendance
            </TableHead>{" "}
            {/* New column for attendance date */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((attendance) => (
            <TableRow key={attendance.id}>
              {" "}
              {/* Ensure key is a valid type */}
              <TableCell className="font-medium">
                {attendance.firstName}
              </TableCell>
              <TableCell className="font-medium">
                {attendance.middleName}
              </TableCell>
              <TableCell className="font-medium">
                {attendance.lastName}
              </TableCell>
              {data?.[0]?.attendance ? (
                <TableCell className="font-medium">
                  {attendance.attendance?.length > 0
                    ? format(
                        new Date(
                          attendance.attendance[0]?.attendance.date ?? "",
                        ),
                        "MMMM d, yyyy",
                      ) // Format the date
                    : "No Attendance"}
                </TableCell>
              ) : null}
              <TableCell className="font-medium">
                <Link
                  href={`/admin/members/profile/${attendance.id}`}
                  target="_blank"
                >
                  <Button size={"sm"} className="bg-teal-800 hover:bg-teal-600">
                    Show more info
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
