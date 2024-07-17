"use client";

import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import ProfileSummary from "./profileSummary";
import OtherInformation from "./otherInformation";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/react";

const page = ({ params }: { params: { id: string } }) => {
  const { data, refetch } = api.members.getAllmembersById.useQuery({
    userId: parseInt(params.id),
  });

  return (
    <div className=" flex  gap-10 ">
      <ProfileSummary data={data} />
      <OtherInformation data={data} />
    </div>
  );
};

export default page;
