import dayjs from "dayjs";
import React from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RouterOutputs } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import SelectDropdownBloodType from "../../../(components)/Select";
import { Calendar } from "~/components/ui/calendar";
import CalendarCustom from "../../../(components)/CalendarCustom";
import SelectMaritalStatus from "../../../(components)/SelectMaritalStatus";
import SelectEducationAttainment from "../../../(components)/SelectEducationalAttainment";
type ProjectMembers = RouterOutputs["members"]["getAllmembersById"];

const EditProfileSummary = ({ data }: { data: ProjectMembers | undefined }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const formatDate = (
    date: string | Date | undefined,
  ): { formattedDate: string; age: number } => {
    if (!date) return { formattedDate: "N/A", age: 0 };

    const dateOfBirth = dayjs(date);
    const formattedDate = dateOfBirth.format("MMMM D, YYYY");
    const age = dayjs().diff(dateOfBirth, "year");

    return { formattedDate, age };
  };

  return (
    <Card className="   flex   max-h-[850px] w-min  flex-col gap-4   overflow-scroll  px-10  ">
      <Label className=" mb-8  text-2xl font-bold   tracking-widest">
        Profile Information
      </Label>
      {!data?.image ? (
        <div className=" relative">
          <div className="  absolute   left-2 top-2 z-50">
            <DataNotFound />
          </div>

          <img
            src="/emptyProfile.png"
            width={300}
            className=" relative rounded-md"
          />
        </div>
      ) : (
        <img src={data?.image as string} width={300} />
      )}
      <div className=" mb-4  w-[500px]"></div>

      <div className=" flex gap-5">
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Lastname</Label>
          <Input
            placeholder={data?.lastName || ""}
            className=" text-md  font-light tracking-wider"
          />
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Firstname</Label>
          <Input
            placeholder={data?.firstName || ""}
            className=" text-md font-light tracking-wider"
          />
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">MiddleName</Label>
          <Input
            placeholder={data?.middleName || ""}
            className=" text-md  font-light tracking-wider"
          />
        </div>
      </div>

      <div className=" flex gap-8">
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Gender</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={data?.sex} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MALE">MALE</SelectItem>
                <SelectItem value="FEMALE">FEMALE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Weight</Label>
          {data?.weight ? (
            <Input
              placeholder={data?.weight || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Height</Label>
          {data?.weight ? (
            <Input
              placeholder={data?.height || ""}
              className=" text-md  min-w-14  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Blood Type</Label>
          {data?.weight ? (
            <SelectDropdownBloodType
              blood={data.bloodType || ""}
              field={undefined}
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      <div className=" flex items-center justify-start  gap-16">
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Birthdate</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.dateofBirth ? (
              <Input
                disabled
                placeholder={formatDate(data.dateofBirth).formattedDate || ""}
                className=" min-w-14  text-sm  font-light tracking-wider"
              />
            ) : (
              <DataNotFound />
            )}
          </Label>
        </div>
        <div className=" flex  flex-col gap-6">
          <Label></Label>
          <CalendarCustom field={undefined} />
        </div>
      </div>
      <div className=" flex  items-center justify-start  gap-10">
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Marital Status</Label>

          <SelectMaritalStatus
            status={data?.maritalStatus || ""}
            field={undefined}
          />
        </div>
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Citizenship</Label>
          {data?.citizenship ? (
            <Input
              placeholder={data?.citizenship || ""}
              className=" text-md  min-w-14  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>

      <div className=" flex items-center justify-start gap-10">
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Phone No.</Label>
          {data?.cellphoneNumber ? (
            <Input
              placeholder={data?.cellphoneNumber || ""}
              className=" text-md  min-w-14  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Telphone No.</Label>
          {data?.homeTelephoneNumber ? (
            <Input
              placeholder={data?.homeTelephoneNumber || ""}
              className=" text-md  min-w-14  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>

      <div className=" flex  flex-col gap-3">
        <Label className="  text-gray-400">Email Address</Label>
        {data?.email ? (
          <Input
            placeholder={data?.email || ""}
            className=" text-md  min-w-14  font-light tracking-wider"
          />
        ) : (
          <DataNotFound />
        )}
      </div>
      <div className=" flex   justify-start gap-10 ">
        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Educational Attainment</Label>
          {data?.educationalAttainment ? (
            <SelectEducationAttainment
              attainment={data.educationalAttainment}
              field={undefined}
            />
          ) : (
            <DataNotFound />
          )}
        </div>

        <div className=" flex  flex-col gap-3">
          <Label className="  text-gray-400">Occupation</Label>
          {data?.occupation ? (
            <Input
              placeholder={data?.occupation || ""}
              className=" text-md  min-w-14  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
    </Card>
  );
};

export default EditProfileSummary;
