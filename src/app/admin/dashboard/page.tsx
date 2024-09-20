"use client";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { FileDigit, NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const page = () => {
  const router = useRouter();
  const { data: dashboardData } = api.dashboard.getDashboardData.useQuery();
  const { data: memberDataWithoutAttendanceForOneMonth } =
    api.dashboard.memberWithoutAttendanceForOneMonth.useQuery();

  const data = dashboardData?.map((data) => {
    return { title: data.title, count: data.count, path: data.path };
  });

  console.log("WWWWWWW");

  return (
    <div className="bg-blue-50 p-20">
      <div className="grid grid-cols-2 gap-4 ">
        {data?.map((card, index) => (
          <div className="rounded-t-md bg-[#fefefe] pt-4" key={index}>
            <Card
              className="relative flex h-56 cursor-pointer items-center justify-center gap-4 rounded-md bg-teal-700 font-bold text-white"
              onClick={() => router.push(`/admin/${card.path}`)}
            >
              <FileDigit size={50} />
              <Label className="text-2xl font-semibold">{card.title}</Label>
              <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-400 text-xl text-white">
                {card.count}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
