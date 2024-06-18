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
import { Badge, SearchX } from "lucide-react";
import ChildrenPopover from "./childrenPopover";

const page = () => {
  const { data, refetch } = api.members.getAllmembers.useQuery();

  return (
    <div>
      <Table>
        <TableCaption>A list of NLCM members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Firstname</TableHead>
            <TableHead className="text-center">MiddleName</TableHead>
            <TableHead className="text-center">LastName</TableHead>
            <TableHead className=" text-center">Date Of Birth</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className=" w-[200px] text-center ">
              Place Of Birth
            </TableHead>
            <TableHead className="text-center ">Permanent Address</TableHead>
            <TableHead className=" text-center ">Present Address</TableHead>
            <TableHead className="text-center ">Contact Number</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Marital Status</TableHead>
            <TableHead className="text-center">Education Attainment</TableHead>
            <TableHead className="text-center">Current Job</TableHead>
            <TableHead className="text-center">Birth Order</TableHead>
            <TableHead className="text-center">Mother</TableHead>
            <TableHead className="text-center">Father</TableHead>
            <TableHead className="text-center">Citizenship</TableHead>
            <TableHead className="text-center">Wife</TableHead>
            <TableHead className="text-center">Children</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((members) => (
            <TableRow key={members.id}>
              <TableCell className="font-medium">{members.firstName}</TableCell>
              <TableCell className="font-medium">
                {members.middleName}
              </TableCell>
              <TableCell className="font-medium">{members.lastName}</TableCell>
              <TableCell className="font-medium">
                {dayjs(members.dateofBirth).format("MMM-DD-YYYY")}{" "}
              </TableCell>
              <TableCell className="font-medium">{members.gender}</TableCell>
              <TableCell className="font-medium">
                {members.placeOfbirth}
              </TableCell>
              <TableCell className="font-medium">
                {members.permanentAddress}
              </TableCell>
              <TableCell className="font-medium">
                {members.presentAddress}
              </TableCell>
              <TableCell className="font-medium">
                {members.contactNumber}
              </TableCell>
              <TableCell className="font-medium">{members.email}</TableCell>
              <TableCell className="font-medium">
                {members.maritalStatus}
              </TableCell>
              <TableCell className="font-medium">
                {members.educationalAttainment}
              </TableCell>
              <TableCell className="font-medium">
                {members.currentJob}
              </TableCell>
              <TableCell className="font-medium">
                {members.birthOrder}
              </TableCell>
              <TableCell className="font-medium">{members.mother}</TableCell>
              <TableCell className="font-medium">{members.father}</TableCell>
              <TableCell className="font-medium">
                {members.citizenship}
              </TableCell>
              <TableCell className="font-medium">{members.wife}</TableCell>
              <TableCell className="font-medium">
                <ChildrenPopover
                  children={members.children}
                  parents={{
                    firstname: members.firstName,
                    lastname: members.lastName,
                  }}
                />
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
