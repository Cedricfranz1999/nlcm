"use client";
import * as React from "react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { RangePicker } from "~/app/_components/Rangepicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { format } from "date-fns"; // Make sure to use date-fns for date formatting
import { DateRange } from "react-day-picker";

// Define the type for the chart data
type ChartDataType = {
  month: string;
  totalattendance: number;
};

const Page = () => {
  const currentYear = new Date().getFullYear();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(currentYear, 0, 1),
    to: new Date(currentYear, 11, 31),
  });

  const { data, refetch } = api.reports.getReportsByDate.useQuery({
    date: date,
  });

  // Process the fetched data to format it for the chart
  const chartData: ChartDataType[] =
    data
      ?.reduce<ChartDataType[]>((acc, { date, _count }) => {
        // Format the date to get the month name
        const month = format(new Date(date), "MMMM");

        // Find if the month already exists in the accumulator
        const existingMonth = acc.find((item) => item.month === month);
        if (existingMonth) {
          // Add the count of members if the month exists
          existingMonth.totalattendance += _count.members;
        } else {
          // Create a new entry if the month does not exist
          acc.push({ month, totalattendance: _count.members });
        }
        return acc;
      }, [])
      // Sort the months in order
      .sort(
        (a, b) =>
          new Date(`01 ${a.month} 2024`).getTime() -
          new Date(`01 ${b.month} 2024`).getTime(),
      ) || [];

  const chartConfig = {
    totalattendance: {
      label: "totalattendance",
      color: "#548CE7",
    },
  } satisfies ChartConfig;

  const refetchFunction =  async() => {
    await refetch()
  }

  React.useEffect( () => {
     refetchFunction()
  }, [date]);
  return (
    <div className="relative">
      <Card className="flex max-h-[850px] w-full flex-col overflow-scroll">
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
          <CardDescription>
            {date?.from ? format(date.from, "MMMM dd, yyyy") : ""} -
            {date?.to ? format(date.to, "MMMM dd, yyyy") : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="totalattendance"
                fill="var(--color-totalattendance)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <div className="absolute right-5 top-5 flex items-center gap-3 rounded-lg bg-white p-2">
        <Label className="font-light text-black">Filter By Date:</Label>
        <RangePicker
          className="your-class"
          date={date}
          setDate={setDate}
        />{" "}
      </div>
    </div>
  );
};

export default Page;
