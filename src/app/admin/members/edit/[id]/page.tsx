"use client";

import React, { useState } from "react";
import DataNotFound from "~/app/_components/dataNotFound";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CircleHelp } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Textarea } from "~/components/ui/textarea";
import { Calendar } from "~/components/ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { addFormschema } from "../../add/addFormSchema";
import CalendarCustom from "../../(components)/CalendarCustom";
import RadioButton from "../../(components)/radioButton";
import SelectDropdownBloodType from "../../(components)/Select";
import SelectMaritalStatus from "../../(components)/SelectMaritalStatus";
import SelectCitizenship from "../../(components)/SelectCitizenship";
import SelectEducationAttainment from "../../(components)/SelectEducationalAttainment";
import { PersonInfo } from "../types";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { id: string } }) => {
  const { data: MemberData, refetch } = api.members.getAllmembersById.useQuery({
    userId: parseInt(params.id),
  });
  const { toast } = useToast();
  const router = useRouter();

  const editMember = api.members.editMember.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully added new member",
      });
      refetch();
    },
  });

  const [childrenData, setChildrenData] = useState([
    { id: 1, title: "Children#1" },
    { id: 2, title: "Children#2" },
    { id: 3, title: "Children#3" },
  ]);

  const [jobExperienceData, setJobExperiences] = useState([
    { id: 1, title: "Job Experience#1" },
    { id: 2, title: "Job Experience#2" },
    { id: 3, title: "Job Experience#3" },
  ]);

  const form = useForm<z.infer<typeof addFormschema>>({
    resolver: zodResolver(addFormschema),
    // defaultValues: {
    //   accountType: "AGENT",
    // },
  });
  console.log("====================================");
  console.log(form.formState.errors);
  console.log("====================================");

  const handleSubmit = async (data: z.infer<typeof addFormschema>) => {
    const jobExperience =
      data.jobExperience?.map((job) => ({
        description:
          job.experience && job.experience.length >= 2 ? job.experience : "", // Ensure length is valid
      })) ?? [];
    // Validate jobExperience array before sending to the server
    if (
      jobExperience.some((job) => job.description && job.description.length < 2)
    ) {
      console.error("One or more job experience descriptions are too short.");
      return;
    }

    await editMember.mutateAsync({
      id: MemberData?.id as number,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateofBirth: data.dateofBirth ?? undefined,
      placeOfbirth: data.placeOfbirth ?? undefined,
      sex: data.sex,
      weight: data.weight ?? "",
      height: data.height ?? "",
      bloodType: data.bloodType ?? undefined,
      maritalStatus: data.maritalStatus,
      citizenship: data.citizenship || "FILIPINO",
      cellphoneNumber: data.cellphoneNumber ?? "",
      homeTelephoneNumber: data.homeTelephoneNumber ?? "",
      email: data.email ?? "",
      educationalAttainment: data.educationalAttainment,
      occupation: data.occupation || "",
      fatherFirstName: data.fatherFirstName || "",
      fatherMiddleName: data.fatherMiddleName || "",
      fatherLastName: data.fatherLastName || "",
      motherFirstName: data.motherFirstName || "",
      motherMiddleName: data.motherMiddleName || "",
      motherLastName: data.motherLastName || "",
      spouseFirstName: data.spouseFirstName || "",
      spouseMiddleName: data.spouseMiddleName || "",
      spouseLastName: data.spouseLastName || "",
      nameOfChildrenAndAge: data.nameOfChildrenAndAge,
      jobExperience: jobExperience,
      presentAddress: data.presentAddress || "",
      previousReligion: data.previousReligion || "",
      personLedYouToTheLord: data.personLedYouToTheLord || "",
      dateAcceptedTheLord: data.dateAcceptedTheLord || undefined,
      firstDayOfChurchAttendance: data.firstDayOfChurchAttendance ?? undefined,
      dateWaterBaptized: data.dateWaterBaptized ?? undefined,
      dateSpiritBaptized: data.dateSpiritBaptized ?? undefined,
      formFilledUpByWho: data?.formFilledUpByWho ?? "",
      dateFilledUp: data.dateFilledUp ?? undefined,
      verified: data.verified ?? "",
      noted: data.noted ?? "",
      encoded: data.encoded ?? "",
    });
  };

  const addChild = () => {
    setChildrenData((prev) => [
      ...prev,
      { id: prev.length + 1, title: `Children#${prev.length + 1}` },
    ]);
    toast({
      title: "Succesfully added children field",
    });
  };

  const addJobExperience = () => {
    setJobExperiences((prev) => [
      ...prev,
      { id: prev.length + 1, title: `Experience#${prev.length + 1}` },
    ]);
    toast({
      title: "Succesfully added job field",
    });
  };

  const setFormValues = (data: any) => {
    form.setValue("firstName", data.firstName);
    form.setValue("lastName", data.lastName);
    form.setValue("middleName", data.middleName);
    form.setValue("dateofBirth", data.dateofBirth);
    form.setValue("placeOfbirth", data.placeOfbirth);
    form.setValue("presentAddress", data.presentAddress);
    form.setValue("sex", data.sex);
    form.setValue("weight", data.weight);
    form.setValue("height", data.height);
    form.setValue("bloodType", data.bloodType);
    form.setValue("maritalStatus", data.maritalStatus);
    form.setValue("citizenship", data.citizenship);
    form.setValue("cellphoneNumber", data.cellphoneNumber);
    form.setValue("homeTelephoneNumber", data.homeTelephoneNumber);
    form.setValue("email", data.email);
    form.setValue("educationalAttainment", data.educationalAttainment);
    form.setValue("occupation", data.occupation);
    form.setValue("fatherLastName", data.fatherLastName);
    form.setValue("fatherFirstName", data.fatherFirstName);
    form.setValue("fatherMiddleName", data.fatherMiddleName);
    form.setValue("motherLastName", data.motherLastName);
    form.setValue("motherFirstName", data.motherFirstName);
    form.setValue("motherMiddleName", data.motherMiddleName);
    form.setValue("spouseLastName", data.spouseLastName);
    form.setValue("spouseFirstName", data.spouseFirstName);
    form.setValue("spouseMiddleName", data.spouseMiddleName);
    form.setValue("previousReligion", data.previousReligion);
    form.setValue("personLedYouToTheLord", data.personLedYouToTheLord);
    form.setValue("dateAcceptedTheLord", data.dateAcceptedTheLord);
    form.setValue(
      "firstDayOfChurchAttendance",
      data.firstDayOfChurchAttendance,
    );
    form.setValue("dateWaterBaptized", data.dateWaterBaptized);
    form.setValue("dateSpiritBaptized", data.dateSpiritBaptized);
    form.setValue("formFilledUpByWho", data?.formFilledUpBy?.formFilledUpByWho);
    form.setValue("dateFilledUp", data.formFilledUpBy?.dateFilledUp);
    form.setValue("verified", data.formFilledUpBy?.verified);
    form.setValue("noted", data.formFilledUpBy?.noted);
    form.setValue("encoded", data.formFilledUpBy?.encoded);

    data.nameOfChildrenAndAge?.forEach((child: any, index: any) => {
      form.setValue(`nameOfChildrenAndAge.${index}.lastName`, child.lastName);
      form.setValue(`nameOfChildrenAndAge.${index}.firstName`, child.firstName);
      form.setValue(
        `nameOfChildrenAndAge.${index}.middleName`,
        child.middleName,
      );
    });

    data.jobExperience?.map(
      (description: { description: string }, index: any) => {
        form.setValue(
          `jobExperience.${index}.experience`,
          description.description,
        );
      },
    );
  };

  React.useEffect(() => {
    if (MemberData) {
      setFormValues(MemberData);
    }
  }, [MemberData]);

  return (
    <Form {...form}>
      <div className=" flex  max-h-[880px] w-full flex-col gap-10 overflow-scroll  px-10">
        <div className="sticky top-0 z-50 flex w-full justify-end bg-white">
          <Button
            size={"sm"}
            className="  bg-green-600 text-xs"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Edit Member
          </Button>
        </div>
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
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="  flex  flex-col gap-3">
                          <Label className="  text-gray-500">Lastname</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex flex-col gap-3">
                          <Label className="   text-gray-500">Firstname</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex  flex-col gap-3">
                          <Label className="  text-gray-500">Middlename</Label>
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex  gap-10 ">
                <FormField
                  control={form.control}
                  name="dateofBirth"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <div className=" flex  flex-col gap-3">
                          <Label className="  text-gray-500">
                            Date of Birth
                          </Label>
                          <CalendarCustom field={field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="placeOfbirth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex flex-col gap-3">
                          <Label className="   text-gray-500">
                            Place of Birth
                          </Label>
                          <Input {...field} value={field.value ?? ""} />{" "}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="presentAddress"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="flex flex-col gap-3">
                          <Label className="text-gray-500">
                            Present Address
                          </Label>
                          <Input {...field} value={field.value ?? ""} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex  gap-14 ">
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="  flex   w-20 flex-col gap-3">
                          <Label className="  text-gray-500">Gender</Label>
                          <RadioButton field={field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex   w-32 flex-col gap-3">
                          <Label className="   text-gray-500">
                            Weight in KG
                          </Label>
                          <Input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                            className="  w-32"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex   w-32 flex-col gap-3">
                          <Label className="   text-gray-500">
                            Height in FT
                          </Label>
                          <Input
                            type="number"
                            {...field}
                            value={field.value ?? ""}
                            className="  w-32"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex    flex-col gap-3">
                          <Label className="   text-gray-500">Blood Type</Label>
                          <SelectDropdownBloodType
                            blood={"Blood Type"}
                            field={field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex    flex-col gap-3">
                          <Label className="   text-gray-500">
                            Marital Status
                          </Label>
                          <SelectMaritalStatus
                            status={"marital status"}
                            field={field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="citizenship"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex   w-20 flex-col gap-3">
                          <Label className="   text-gray-500">
                            Citizenship
                          </Label>
                          <SelectCitizenship field={field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex gap-10">
                <FormField
                  control={form.control}
                  name="cellphoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="  flex flex-1 flex-col gap-3">
                          <Label className="  text-gray-500">Mobile No.</Label>
                          <Input {...field} value={field.value ?? ""} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="homeTelephoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="  flex flex-1 flex-col gap-3">
                          <Label className="  text-gray-500">
                            Telephone No.
                          </Label>
                          <Input {...field} value={field.value ?? ""} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex flex-1 flex-col gap-3">
                          <Label className="  text-gray-500">
                            Email Address:
                          </Label>
                          <Input {...field} value={field.value ?? ""} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationalAttainment"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex flex-1 flex-col gap-3">
                          <Label className="  text-gray-500">
                            Educational Attainment
                          </Label>
                          <SelectEducationAttainment
                            attainment=""
                            field={field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex flex-1 flex-col gap-3">
                          <Label className="  text-gray-500">Present Job</Label>
                          <Input {...field} value={field.value ?? ""} />{" "}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <FormField
                control={form.control}
                name="fatherLastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Lastname</Label>
                        <Input {...field} value={field.value ?? ""} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherFirstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Firstname</Label>
                        <Input {...field} value={field.value ?? ""} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fatherMiddleName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Middlename</Label>
                        <Input {...field} value={field.value ?? ""} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
            <Card className=" mt-10 flex w-1/4 flex-1 flex-col gap-5 px-5 py-10  ">
              <div className=" flex  w-full justify-center ">
                <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                  Mothers name
                </Label>
              </div>
              <FormField
                control={form.control}
                name="motherLastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Lastname</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherFirstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Firstname</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherMiddleName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Middlename</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
            <Card className="  mt-10 flex  flex-1 flex-col gap-5 px-5 py-10  ">
              <div className=" flex  w-full justify-center ">
                <Label className=" mb-10 text-xl font-medium text-gray-600  ">
                  Spouse name
                </Label>
              </div>
              <FormField
                control={form.control}
                name="spouseLastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Lastname</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spouseFirstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Firstname</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spouseMiddleName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="  flex flex-1 flex-col gap-3">
                        <Label className="  text-gray-500">Middlename</Label>
                        <Input {...field} value={field.value ?? ""} />{" "}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Button onClick={addChild}>Add more child</Button>
          </div>

          <div className="flex w-[1400px] gap-10 overflow-x-scroll">
            {MemberData?.nameOfChildrenAndAge instanceof Array &&
              (
                MemberData.nameOfChildrenAndAge as {
                  firstName: string;
                  id: number;
                  lastName: string;
                  middleName: string;
                }[]
              ).map((child, index) => (
                <Card
                  // key={child.id}
                  className="flex min-w-[500px] flex-col gap-5 px-5 py-10"
                >
                  <div className="flex w-full justify-center">
                    <Label className="mb-10 text-xl font-medium text-gray-600">
                      {child.id}
                    </Label>
                  </div>

                  <FormField
                    // key={child.id}
                    control={form.control}
                    name={`nameOfChildrenAndAge.${index}.lastName`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex flex-1 flex-col gap-3">
                            <Label className="text-gray-500">Lastname</Label>
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    // key={child.id}
                    control={form.control}
                    name={`nameOfChildrenAndAge.${index}.firstName`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex flex-1 flex-col gap-3">
                            <Label className="text-gray-500">Firstname</Label>
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    // key={child.id}
                    control={form.control}
                    name={`nameOfChildrenAndAge.${index}.middleName`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex flex-1 flex-col gap-3">
                            <Label className="text-gray-500">middleName</Label>
                            <Label></Label>
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              ))}
          </div>
          <div className=" mt-3 flex  items-center gap-2  ">
            <Badge className=" flex gap-2  font-light text-white">
              <CircleHelp className=" white-red-500" size={18} />
              Leave a blank if not applicable
            </Badge>
          </div>
          <div className=" mt-5  flex items-center justify-between">
            <Label className="  my-5 text-xl ">List of Job experience:</Label>
            <Button onClick={addJobExperience}>add more jobs field</Button>
          </div>

          <div className="  flex    w-[1400px] gap-10  overflow-x-scroll ">
            {MemberData?.jobExperience instanceof Array &&
              (
                MemberData.jobExperience as {
                  experience: string;
                }[]
              ).map((experience, index) => (
                <Card
                  // key={experience.id}
                  className="flex min-w-[500px]  flex-col gap-5 px-5 py-10"
                >
                  <div className="flex w-full justify-center">
                    <Label className="mb-10 text-xl font-medium text-gray-600">
                      {experience.experience}
                    </Label>
                  </div>

                  <FormField
                    // key={experience.id}
                    control={form.control}
                    name={`jobExperience.${index}.experience`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="flex  flex-col  gap-3">
                            <Textarea
                              placeholder="Description "
                              className=" px-4"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              ))}
          </div>
          <div className=" mt-5  flex items-center justify-between">
            <Label className="  my-5 text-xl "> Religion Side: </Label>
          </div>

          <div className=" flex gap-1">
            <FormField
              control={form.control}
              name="previousReligion"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1  flex-col gap-3">
                      <Label className="   text-gray-500">
                        Previous Religion
                      </Label>
                      <Input {...field} value={field.value ?? ""} />{" "}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personLedYouToTheLord"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1  flex-col gap-3">
                      <Label className="   text-gray-500">
                        Person leads you to the LORD
                      </Label>
                      <Input {...field} value={field.value ?? ""} />{" "}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateAcceptedTheLord"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">
                        Date Accepted the LORD
                      </Label>
                      <CalendarCustom field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstDayOfChurchAttendance"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">
                        1st Day church attended
                      </Label>
                      <CalendarCustom field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateWaterBaptized"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">
                        Date water baptized
                      </Label>
                      <CalendarCustom field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateSpiritBaptized"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">
                        Date Spirit baptized
                      </Label>
                      <CalendarCustom field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" mt-5  flex items-center justify-between">
            <Label className="  my-5 text-xl "> Office Side: </Label>
          </div>

          <div className=" flex gap-10">
            <FormField
              control={form.control}
              name="formFilledUpByWho"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="  flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">
                        form Filled up By:
                      </Label>
                      <Input {...field} value={field.value ?? ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateFilledUp"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className=" flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">Date Filled up:</Label>
                      <CalendarCustom field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verified"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="  flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">Verified :</Label>
                      <Input {...field} value={field.value ?? ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noted"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="  flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">Noted:</Label>
                      <Input {...field} value={field.value ?? ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="encoded"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="  flex flex-1 flex-col gap-3">
                      <Label className="  text-gray-500">Encoded:</Label>
                      <Input {...field} value={field.value ?? ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      </div>
    </Form>
  );
};

export default page;
