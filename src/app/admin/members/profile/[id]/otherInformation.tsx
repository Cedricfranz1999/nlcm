import React from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RouterOutputs } from "~/trpc/react";
type ProjectMembers = RouterOutputs["members"]["getAllmembersById"];
import { db } from "~/server/db";
import dayjs from "dayjs";

const OtherInformation = ({ data }: { data: ProjectMembers | undefined }) => {
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
    <Card className=" flex    max-h-[870px] flex-1  flex-col gap-5 overflow-scroll   px-24">
      <div className=" flex items-center justify-center ">
        <Label className="  mb-14   text-center text-2xl font-bold  tracking-widest ">
          Other Information
        </Label>
      </div>
      <div className=" flex items-center gap-5">
        <div className=" flex   flex-col">
          <div className="    flex w-72     whitespace-nowrap">
            {" "}
            <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
              {" "}
              Fathers Name:
            </Label>
          </div>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Lastname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.fatherLastName ? data.fatherLastName : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Firstname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.fatherFirstName ? data.fatherFirstName : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">MiddleName</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.fatherMiddleName ? data.fatherMiddleName : <DataNotFound />}
          </Label>
        </div>
      </div>
      <div className=" flex items-center gap-5">
        <div className=" flex   flex-col">
          <div className="    flex w-72     whitespace-nowrap">
            {" "}
            <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
              {" "}
              Mothers Name:
            </Label>
          </div>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Lastname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.motherLastName ? data.motherLastName : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Firstname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.motherFirstName ? data.motherFirstName : <DataNotFound />}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">MiddleName</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {data?.middleName ? data.middleName : <DataNotFound />}
          </Label>
        </div>
      </div>
      <div className=" flex items-center gap-5">
        <div className="    flex w-72     whitespace-nowrap">
          {" "}
          <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
            {" "}
            Spouse Name:
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Lastname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.spouseLastName}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">Firstname</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.spouseFirstName}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className="  text-gray-400">MiddleName</Label>
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.spouseMiddleName}
          </Label>
        </div>
      </div>
      {/* list of children */}
      {data?.nameOfChildrenAndAge ? (
        <div className=" mt-10  ">
          <div className=" flex items-center gap-5 ">
            <div className="    flex  w-72    whitespace-nowrap">
              {" "}
              <Label className=" mb-4  mr-5  text-2xl font-semibold  tracking-wider">
                {" "}
                List of Childrens:
              </Label>
            </div>
          </div>
          {(
            data?.nameOfChildrenAndAge as {
              id: number;
              firstName: string;
              age: number;
              lastName: string;
              middleName: string;
            }[]
          )?.map((child, index) => (
            <div
            key={index}
              className={`bg-red-20 flex items-start gap-5 ${child.firstName && child.lastName ? "" : "hidden"}`}
            >
              <div className="    List of Childrens flex w-72     whitespace-nowrap">
                {" "}
                <Label className="  ml-4 text-xl font-medium  tracking-widest">
                  {" "}
                  Birth Order{index + 1}:
                </Label>
              </div>
              <div className=" flex   flex-col">
                <Label className="  text-gray-400">Lastname</Label>
                <Label className=" text-2xl  font-light tracking-wider">
                  {" "}
                  {child.lastName}
                </Label>
              </div>
              <div className=" flex   flex-col">
                <Label className="  text-gray-400">Firstname</Label>
                <Label className=" text-2xl  font-light tracking-wider">
                  {" "}
                  {child.firstName}
                </Label>
              </div>
              <div className=" flex   flex-col">
                <Label className="  text-gray-400">MiddleName</Label>
                <Label className=" text-2xl  font-light tracking-wider">
                  {" "}
                  {child.middleName}
                </Label>
              </div>
              {/* <div className=" mx-4   flex  flex-col ">
                <Label className="  text-gray-400">Age</Label>
                <Label className=" text-2xl  font-light tracking-wider">
                  {" "}
                  {child.age}
                </Label>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
      {data?.nameOfChildrenAndAge ? (
        <div className={` $ mt-10   `}>
          <div className=" flex items-center gap-5 ">
            <div className="    flex  w-72    whitespace-nowrap">
              {" "}
              <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
                {" "}
                List of Experience:
              </Label>
            </div>
          </div>
          {(
            data?.jobExperience as {
              id: number;
              description: string;
            }[]
          )?.map((experience) => (
            <div
            key={experience.id}
              className={` flex items-center gap-5  ${experience.description ? "" : "hidden"} `}
            >
              <div className="    List of Childrens flex w-72     whitespace-nowrap">
                {" "}
                <Label className="  ml-4 text-xl font-medium  tracking-widest">
                  {" "}
                  Experience{experience.id} :
                </Label>
              </div>
              <div className=" flex   flex-col">
                <Label className=" text-2xl  font-light tracking-wider">
                  {" "}
                  {experience.description}
                </Label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
      <div className=" mt-6 flex items-center  gap-5">
        <div className="    flex w-72     whitespace-nowrap">
          <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
            {" "}
            Previous religion{" "}
          </Label>
        </div>
        <div className=" flex   flex-col">
          <Label className=" text-2xl  font-light tracking-wider">
            {" "}
            {data?.previousReligion ? data.previousReligion : <DataNotFound />}
          </Label>
        </div>
      </div>
      <div className=" mt-6 flex items-center  gap-5">
        <div className="    flex w-72     flex-col whitespace-nowrap">
          <Label className=" mr-5  text-2xl font-semibold  tracking-wider">
            {" "}
            Person leads to
          </Label>
          <Label className=" mr-5  text-2xl font-semibold  tracking-wider">
            you to the LORD:
          </Label>
        </div>
        {data?.personLedYouToTheLord ? (
          <div className=" flex   flex-col">
            <Label className=" text-2xl  font-light tracking-wider">
              {" "}
              Jae Libril
            </Label>
          </div>
        ) : (
          <DataNotFound />
        )}
      </div>
      <div className=" my-10  flex w-full items-center    gap-16   ">
        <div className=" flex   flex-col">
          <Label className=" mr-5   text-xl font-semibold  ">
            Date accepted the LORD
          </Label>
          {data?.dateAcceptedTheLord ? (
            <Label className=" text-xl  font-light tracking-wider">
              {" "}
              {formatDate(data.dateAcceptedTheLord).formattedDate}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>

        <div className=" flex   flex-col">
          <Label className=" mr-5   text-xl font-semibold  ">
            1st day of church attended
          </Label>
          {data?.firstDayOfChurchAttendance ? (
            <Label className=" text-xl  font-light tracking-wider">
              {" "}
              {formatDate(data.firstDayOfChurchAttendance).formattedDate}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col">
          <Label className=" mr-5   text-xl font-semibold  ">
            Date water baptized
          </Label>
          {data?.dateSpiritBaptized ? (
            <Label className=" text-xl  font-light tracking-wider">
              {" "}
              {formatDate(data.dateSpiritBaptized).formattedDate}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      <div
        className={`   flex w-full flex-col    items-start gap-10 ${data?.formFilledUpBy ? "" : "hidden"} `}
      >
        <div className=" flex   flex-col">
          <Label className=" mr-5   text-xl font-semibold  ">ID NO:</Label>
          {data?.formFilledUpBy?.idNo ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.idNo}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col  gap-2">
          <Label className=" mr-5   gap-2 text-xl   font-semibold">
            Form filled up by:
          </Label>
          {data?.formFilledUpBy?.formFilledUpByWho ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.formFilledUpByWho}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col">
          <Label className=" mr-5   gap-2 text-xl  font-medium ">
            Date filled up
          </Label>
          {data?.formFilledUpBy?.dateFilledUp ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {formatDate(data.formFilledUpBy.dateFilledUp).formattedDate}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>

        <div className=" flex   flex-col">
          <Label className=" mr-5   gap-2 text-xl  font-medium  ">
            Verified
          </Label>
          {data?.formFilledUpBy?.verified ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.verified}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col">
          <Label className=" mr-5   gap-2 text-xl   font-semibold">Noted</Label>
          {data?.formFilledUpBy?.noted ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.noted}
            </Label>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col">
          <Label className=" mr-5   gap-2 text-xl  font-medium ">Encoded</Label>
          {data?.formFilledUpBy?.encoded ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.encoded}
            </Label>
          ) : (
            <DataNotFound />
          )}{" "}
        </div>
      </div>
    </Card>
  );
};

export default OtherInformation;
