"use client";

import React, { useState } from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import RadioButton from "../(components)/radioButton";
import SelectDropdown from "../(components)/Select";
import SelectCitizenship from "../(components)/SelectCitizenship";
import SelectMaritalStatus from "../(components)/SelectMaritalStatus";
import { CircleHelp } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Textarea } from "~/components/ui/textarea";
import { Calendar } from "~/components/ui/calendar";
import CalendarCustom from "../(components)/CalendarCustom";

const page = () => {
  const [itemCount, setItemCount] = useState(1);

  return (
    <div className=" flex  max-h-[880px] w-full flex-col gap-10 overflow-scroll  px-10">
      <Card className=" flex w-full  flex-col gap-10 p-10">
        {/* profile Information */}
        <div className=" flex  w-full justify-center">
          <Label className="    float-ce text-2xl font-bold   ">
            Profile Information
          </Label>
        </div>

        <div className=" flex  w-full">
          <div className="  flex   w-1/4 flex-col items-center justify-center    gap-3">
            <Card className=" flex flex-col gap-5 p-4">
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

              <Button className=" w-full">Add Image</Button>
            </Card>
          </div>

          <div className="   flex w-full   flex-col    gap-14  px-10  ">
            <div className=" flex gap-10">
              <div className="  flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">Lastname</Label>
                <Input />
              </div>
              <div className=" flex flex-1  flex-col gap-3">
                <Label className="   text-gray-500">Firstname</Label>
                <Input />
              </div>
              <div className=" flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">Middlename</Label>
                <Input />
              </div>
            </div>
            <div className=" flex  gap-14 ">
              <div className="  flex   w-20 flex-col gap-3">
                <Label className="  text-gray-500">Gender</Label>
                <RadioButton />
              </div>
              <div className=" flex   w-32 flex-col gap-3">
                <Label className="   text-gray-500">Weight in KG</Label>
                <Input className="  w-32" />
              </div>
              <div className=" flex   w-32 flex-col gap-3">
                <Label className="   text-gray-500">Height in FT</Label>
                <Input className="  w-32" />
              </div>
              <div className=" flex    flex-col gap-3">
                <Label className="   text-gray-500">Blood Type</Label>
                <SelectDropdown />
              </div>
              <div className=" flex    flex-col gap-3">
                <Label className="   text-gray-500">Marital Status</Label>
                <SelectMaritalStatus />
              </div>

              <div className=" flex   w-20 flex-col gap-3">
                <Label className="   text-gray-500">Citizenship</Label>
                <SelectCitizenship />
              </div>
            </div>
            <div className=" flex gap-10">
              <div className="  flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">Mobile No.</Label>
                <Input />
              </div>
              <div className=" flex flex-1  flex-col gap-3">
                <Label className="   text-gray-500">Telephone No.</Label>
                <Input />
              </div>
              <div className=" flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">Email Address:</Label>
                <Input />
              </div>
              <div className=" flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">
                  Educational Attainment
                </Label>
                <Input />
              </div>
              <div className=" flex flex-1 flex-col gap-3">
                <Label className="  text-gray-500">Present Job</Label>
                <Input />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className=" flex w-full flex-col  gap-0 px-10 py-5">
        <div className=" flex  w-full justify-center">
          <Label className="    float-ce text-2xl font-bold  ">
            Other Information
          </Label>
        </div>

        <div className=" mt-10 flex  items-center gap-2  ">
          <Badge className=" flex gap-2  font-light text-white">
            <CircleHelp className=" white-red-500" size={18} />
            Leave a blank if not applicable
          </Badge>
        </div>
        <div className="  flex w-full  gap-10 ">
          <Card className=" mt-10 flex w-1/4 flex-1 flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Fathers name
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
          <Card className=" mt-10 flex w-1/4 flex-1 flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Mothers name
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
          <Card className="  mt-10 flex  flex-1 flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Spouse name
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
        </div>

        <div className=" mt-3 flex  items-center gap-2  ">
          <Badge className=" flex gap-2  font-light text-white">
            <CircleHelp className=" white-red-500" size={18} />
            Leave a blank if not applicable
          </Badge>
        </div>
        <div className=" mt-5  flex items-center justify-between">
          <Label className="  my-5 text-xl ">List of Childrens:</Label>
          <Button>Add more child</Button>
        </div>

        <div className="  flex    w-[1400px] gap-10  overflow-x-scroll ">
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Children#1
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Children#2
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Children#3
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
          <Card className=" flex min-w-[500px]   flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Children#3
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Lastname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Firstname</Label>
              <Input />
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Middlename</Label>
              <Input />
            </div>
          </Card>
        </div>
        <div className=" mt-3 flex  items-center gap-2  ">
          <Badge className=" flex gap-2  font-light text-white">
            <CircleHelp className=" white-red-500" size={18} />
            Leave a blank if not applicable
          </Badge>
        </div>
        <div className=" mt-5  flex items-center justify-between">
          <Label className="  my-5 text-xl ">List of Job experience:</Label>
          <Button>add more field</Button>
        </div>

        <div className="  flex    w-[1400px] gap-10  overflow-x-scroll ">
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Experience#1
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Job Description</Label>
              <Textarea className="  h-32" placeholder="type here ..." />
            </div>
          </Card>
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Experience#2
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Job Description</Label>
              <Textarea className="    h-32" placeholder="type here ..." />
            </div>
          </Card>
          <Card className=" flex  min-w-[500px] flex-col gap-5 px-5 py-10  ">
            <div className=" flex  w-full justify-center ">
              <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                Experience#3
              </Label>
            </div>
            <div className="  flex flex-1 flex-col gap-3">
              <Label className="  text-gray-500">Job Description</Label>
              <Textarea className="  h-32" placeholder="type here ..." />
            </div>
          </Card>
        </div>
        <div className=" mt-5  flex items-center justify-between">
          <Label className="  my-5 text-xl "> Religion Side: </Label>
        </div>

        <div className=" flex gap-10">
          <div className="  flex flex-1 flex-col gap-3">
            <Label className="  text-gray-500">Previous religion</Label>
            <Input />
          </div>
          <div className=" flex flex-1  flex-col gap-3">
            <Label className="   text-gray-500">
              Person leads you to the LORD
            </Label>
            <Input />
          </div>
          <div className=" flex flex-1 flex-col gap-3">
            <Label className="  text-gray-500">Date Accepted the LORD</Label>
            <CalendarCustom />
          </div>
          <div className=" flex flex-1 flex-col gap-3">
            <Label className="  text-gray-500">1st Day church attended</Label>
            <CalendarCustom />
          </div>
          <div className=" flex flex-1 flex-col gap-3">
            <Label className="  text-gray-500">Date water baptized</Label>
            <CalendarCustom />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
