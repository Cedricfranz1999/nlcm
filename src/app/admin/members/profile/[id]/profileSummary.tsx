import dayjs from "dayjs";
import React from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RouterOutputs } from "~/trpc/react";
type ProjectMembers = RouterOutputs["members"]["getAllmembersById"];

const ProfileSummary = ({ data }: { data: ProjectMembers | undefined }) => {
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
    <Card className="   flex   w-min    flex-col gap-4  px-10  ">
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
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Lastname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.lastName}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Firstname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.firstName}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">MiddleName</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.middleName}
          </Label>
        </div>
      </div>

      <div className=" flex gap-8">
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Gender</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.sex}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Weight</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.weight ? data.weight : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Height</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.height ? data.height : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Blood type</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.height ? data.bloodType : <DataNotFound />}
          </Label>
        </div>
      </div>
      <div className=" flex items-center justify-start gap-10">
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Birthdate</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.dateofBirth ? (
              formatDate(data.dateofBirth).formattedDate
            ) : (
              <DataNotFound />
            )}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Age</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.dateofBirth ? (
              formatDate(data.dateofBirth).age
            ) : (
              <DataNotFound />
            )}
          </Label>
        </div>
      </div>
      <div className=" flex  items-center gap-10">
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Marital Status</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.maritalStatus}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Citizenship</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.citizenship ? data.citizenship : <DataNotFound />}
          </Label>
        </div>
      </div>

      <div className=" flex items-center gap-5">
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Phone No.</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.cellphoneNumber ? data.cellphoneNumber : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Telphone No.</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.homeTelephoneNumber ? (
              data.homeTelephoneNumber
            ) : (
              <DataNotFound />
            )}
          </Label>
        </div>
      </div>

      <div className=" flex  flex-col gap-1">
        <Label className="  text-gray-400">Email Address</Label>
        <Label className=" text-2xl  font-light tracking-wider">
          {" "}
          {data?.email ? data.email : <DataNotFound />}
        </Label>
      </div>
      <div className=" flex   justify-between">
        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Educational Attainment</Label>
          <Label className=" text-xl  font-light tracking-wider">
            {" "}
            {data?.educationalAttainment ? (
              data.educationalAttainment
            ) : (
              <DataNotFound />
            )}
          </Label>
        </div>

        <div className=" flex  flex-col gap-1">
          <Label className="  text-gray-400">Occupation</Label>
          <Label className=" text-xl  font-light tracking-wider">
            {" "}
            {data?.occupation ? data.occupation : <DataNotFound />}
          </Label>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;
