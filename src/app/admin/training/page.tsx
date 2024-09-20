"use client";

import React, { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Calendar } from "~/components/ui/calendar";
import CalendarCustom from "../members/(components)/CalendarCustom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { MultiSelect } from "~/components/ui/multi-select";
import Link from "next/link";

const addDateFormschema = z.object({
  name: z.string().min(2, {
    message: " must be at least 2 characters.",
  }),
  attendaceDate: z.date(),
});

const page = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const { data, refetch } = api.training.getAllTrainingList.useQuery();
  const form = useForm<z.infer<typeof addDateFormschema>>({
    resolver: zodResolver(addDateFormschema),
  });

  const addAttendance = api.training.addTraining.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully added new training",
      });
      refetch();
    },
  });

  const handleSubmit = async (value: z.infer<typeof addDateFormschema>) => {
    // Check if both the attendance date and name already exist in the fetched data
    const isDateAndNameExisting = data?.some(
      (attendance) =>
        format(new Date(attendance.date), "yyyy-MM-dd") ===
          format(new Date(value.attendaceDate), "yyyy-MM-dd") &&
        attendance.trainingName.toLowerCase() === value.name.toLowerCase(),
    );

    if (isDateAndNameExisting) {
      toast({
        title: "Error",
        description: "Attendance for this name and date already exists.",
      });
      return;
    }

    // Proceed with adding attendance
    await addAttendance.mutateAsync({
      name: value.name,
      attendaceDate: value.attendaceDate,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className=" flex   h-screen max-h-[850px] w-full cursor-pointer flex-col items-start justify-start   gap-10 overflow-scroll p-10 ">
      <div className=" mb-20 flex w-full items-center justify-between">
        <Label className=" text-2xl font-semibold text-[#3b3a3a] underline ">
          {" "}
          Training member Management
        </Label>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add training session</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new training session</DialogTitle>
              <DialogDescription>
                Make sure to filed up all fileds . Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <div className="grid gap-4 py-4">
                <div className=" flex  flex-col gap-3">
                  <Label htmlFor="name">Name</Label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="  flex  flex-col gap-3">
                            <Input {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="attendaceDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className=" flex  flex-col gap-3">
                          <Label htmlFor="name">Date</Label>
                          <div className=" w-full">
                            <CalendarCustom field={field} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
            <DialogFooter>
              <Button
                type="submit"
                onClick={form.handleSubmit(handleSubmit)}
                className=" bg-teal-700 hover:bg-teal-600"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {data?.map((data) => {
        return (
          <div className=" flex  w-full flex-col      border-2  ">
            <div className=" h-12  w-full rounded-t-sm  bg-teal-700 px-2 pt-2 text-white">
              <Label className=" text-xs  font-light">
                {data.trainingName}
              </Label>
            </div>
            <div className="   flex h-16 w-full items-center justify-between   rounded-b-lg px-4 py-2 ">
              <Label className="text-xs font-semibold">
                {" "}
                {format(data.date, "MMMM dd, yyyy")}
              </Label>
              <div className=" flex items-center justify-center gap-3">
                <Label className="text-xs font-semibold">members count</Label>
                <Badge className=" bg-red-400">{data._count.members}</Badge>
              </div>
              <Link href={`/admin/training/${data.id}`}>
                {" "}
                <Button
                  size={"sm"}
                  className=" bg-teal-800   hover:bg-teal-600"
                >
                  show more info
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
