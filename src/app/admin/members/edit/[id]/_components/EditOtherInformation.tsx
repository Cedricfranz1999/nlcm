import React from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RouterOutputs } from "~/trpc/react";
type ProjectMembers = RouterOutputs["members"]["getAllmembersById"];
import { db } from "~/server/db";
import dayjs from "dayjs";
import { Input } from "~/components/ui/input";

const EditOtherInformation = ({
  data,
}: {
  data: ProjectMembers | undefined;
}) => {
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
          <div className="    flex whitespace-nowrap">
            {" "}
            <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
              {" "}
              Fathers Name:
            </Label>
          </div>
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Lastname</Label>{" "}
          {data?.fatherLastName ? (
            <Input
              placeholder={data?.fatherLastName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Firstname</Label>{" "}
          {data?.fatherFirstName ? (
            <Input
              placeholder={data?.fatherFirstName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">MiddleName</Label>
          {data?.fatherMiddleName ? (
            <Input
              placeholder={data?.middleName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      <div className=" flex items-center gap-5">
        <div className=" flex   flex-col">
          <div className="    flex    whitespace-nowrap">
            {" "}
            <Label className=" mr-3   text-2xl font-semibold  tracking-wider">
              {" "}
              Mothers Name:
            </Label>
          </div>
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Lastname</Label>
          {data?.motherLastName ? (
            <Input
              placeholder={data?.motherLastName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Firstname</Label>
          {data?.motherFirstName ? (
            <Input
              placeholder={data?.motherFirstName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">MiddleName</Label>
          {data?.fatherLastName ? (
            <Input
              placeholder={data?.motherLastName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      <div className=" flex items-center gap-5">
        <div className=" whitespace-nowrap">
          {" "}
          <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
            {" "}
            Spouse Name:
          </Label>
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Lastname</Label>
          {data?.spouseLastName ? (
            <Input
              placeholder={data?.spouseLastName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">Firstname</Label>
          {data?.spouseFirstName ? (
            <Input
              placeholder={data?.spouseFirstName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className=" flex   flex-col gap-3">
          <Label className="  text-gray-400">MiddleName</Label>
          {data?.spouseMiddleName ? (
            <Input
              placeholder={data?.spouseMiddleName || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      {/* list of children */}
      {data?.nameOfChildrenAndAge ? (
        <div className=" mt-10  ">
          <div className=" flex items-center gap-5 ">
            <div className="    flex  w-72    whitespace-nowrap">
              {" "}
              <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
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
          )?.map((child) => (
            <div className=" bg-red mt-6 flex items-center gap-5">
              <div className="    List of Childrens flex    whitespace-nowrap">
                {" "}
                <Label className="  ml-4 text-xl font-medium  tracking-widest">
                  {" "}
                  Birth Order{child.id}:
                </Label>
              </div>
              <div className=" flex   flex-col gap-3">
                <Label className="  text-gray-400">Lastname</Label>
                {child.lastName ? (
                  <Input
                    placeholder={child.lastName || ""}
                    className=" text-md  font-light tracking-wider"
                  />
                ) : (
                  <DataNotFound />
                )}
              </div>
              <div className=" flex   flex-col gap-3">
                <Label className="  text-gray-400">Firstname</Label>
                {child.firstName ? (
                  <Input
                    placeholder={child?.firstName || ""}
                    className=" text-md  font-light tracking-wider"
                  />
                ) : (
                  <DataNotFound />
                )}
              </div>
              <div className=" flex   flex-col">
                <Label className="  text-gray-400">MiddleName</Label>
                {child.middleName ? (
                  <Input
                    placeholder={child.middleName || ""}
                    className=" text-md  font-light tracking-wider"
                  />
                ) : (
                  <DataNotFound />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
      {data?.nameOfChildrenAndAge ? (
        <div className=" mt-10  ">
          <div className=" flex items-center gap-5 ">
            <div className="    flex     whitespace-nowrap">
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
              experience: string;
            }[]
          )?.map((experience) => (
            <div className=" mt-6 flex items-center gap-4">
              <div className="    List of Childrens   flex    whitespace-nowrap">
                {" "}
                <Label className="  ml-4 text-xl font-medium  tracking-widest">
                  {" "}
                  Experience{experience.id} :
                </Label>
              </div>
              <div className=" flex   flex-col">
                {experience ? (
                  <Input
                    placeholder={experience.experience || ""}
                    className=" text-md  font-light tracking-wider"
                  />
                ) : (
                  <DataNotFound />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
      <div className=" mt-6 flex items-center  gap-5">
        <div className="    flex      whitespace-nowrap">
          <Label className=" mr-5   text-2xl font-semibold  tracking-wider">
            {" "}
            Previous religion{" "}
          </Label>
        </div>
        <div className=" flex   flex-col">
          {data?.motherLastName ? (
            <Input
              placeholder={data?.previousReligion || ""}
              className=" text-md  font-light tracking-wider"
            />
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
      <div className=" mt-6 flex items-center  gap-5">
        <div className="    flex      flex-col whitespace-nowrap">
          <Label className=" mr-5  text-2xl font-semibold  tracking-wider">
            {" "}
            Person leads to
          </Label>
          <Label className=" mr-5  text-2xl font-semibold  tracking-wider">
            you to the LORD:
          </Label>
        </div>
        {data?.personLedYouToTheLord ? (
          <Input
            placeholder={data?.motherLastName || ""}
            className=" text-md  font-light tracking-wider"
          />
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
        className={`   flex w-full items-center    gap-10 ${data?.formFilledUpBy ? "" : "hidden"} `}
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
          {data?.formFilledUpBy?.formFilledUpBy ? (
            <Label className=" gap-2  text-xl font-light  tracking-wider">
              {data?.formFilledUpBy?.formFilledUpBy}
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

export default EditOtherInformation;
