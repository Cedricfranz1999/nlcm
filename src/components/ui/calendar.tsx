import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "./card";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [yearPickerModal, setYearPickerModal] = useState<boolean>(false);

  const handlePreviousYear = (yearStep: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - yearStep, currentMonth.getMonth()),
    );
  };

  const getYearRange = (yearValue: number) => {
    const getYearRange = new Date(
      currentMonth.getFullYear() - 4 + yearValue,
      currentMonth.getMonth(),
    );

    return getYearRange;
  };

  const handleNextYear = (yearStep: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + yearStep, currentMonth.getMonth()),
    );
  };

  const handleChoosedYear = (choosedYear: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear() - currentMonth.getFullYear() + choosedYear,
        currentMonth.getMonth(),
      ),
    );
    setYearPickerModal(false);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between items-center pt-1 relative",
        caption_label: "text-sm font-medium",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "mr-2",
        nav_button_next: "ml-2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4 " />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
        Head: () => (
          <>
            <Card
              className={` ${
                yearPickerModal ? "" : "hidden"
              } absolute -top-16 left-0 z-50 min-h-96   min-w-72`}
            >
              <CardContent>
                <div className="absolute left-4 top-12 flex gap-20 ">
                  <DoubleArrowLeftIcon
                    className="h-4 w-4 cursor-pointer "
                    onClick={() => handlePreviousYear(10)}
                  />
                  <small
                    onClick={() => setYearPickerModal(true)}
                    className="cursor-pointer "
                  >
                    <div className="flex ">
                      <p> {getYearRange(0).getFullYear()}-</p>
                      <p>{getYearRange(9).getFullYear()}</p>
                    </div>
                  </small>
                  <DoubleArrowRightIcon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleNextYear(10)}
                  />
                </div>
                <div className="absolute -left-1 top-24 grid h-72 w-72 grid-cols-3 grid-rows-4">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className={`  text-center  `}>
                      <small
                        onClick={(e) => {
                          handleChoosedYear(
                            parseInt(e.currentTarget.textContent || "", 10),
                          );
                        }}
                        className={`w-10 cursor-pointer rounded-sm p-4 ${
                          index === 0 || index === 11
                            ? " cursor-not-allowed bg-gray-300 bg-opacity-50 "
                            : " hover:bg-primary"
                        }`}
                      >
                        {getYearRange(index - 1).getFullYear()}
                      </small>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <small
              className="absolute -left-1 top-5 z-50 flex h-4 w-40 gap-14"
              onClick={() => setYearPickerModal(true)}
            >
              {" "}
            </small>
          </>
        ),
      }}
      {...props}
      onMonthChange={setCurrentMonth}
      month={currentMonth}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
