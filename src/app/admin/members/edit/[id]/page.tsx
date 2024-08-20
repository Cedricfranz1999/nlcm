"use client";

import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import ProfileSummary from "../../profile/[id]/profileSummary";
import OtherInformation from "../../profile/[id]/otherInformation";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/react";
import EditProfileSummary from "./_components/EditProfileSummary";
import EditOtherInformation from "./_components/EditOtherInformation";

const page = ({ params }: { params: { id: string } }) => {
  const { data, refetch } = api.members.getAllmembersById.useQuery({
    userId: parseInt(params.id),
  });

  return (
    <div className=" flex  gap-10 ">
      <EditProfileSummary data={data} />
      <EditOtherInformation data={data} />
    </div>
  );
};

export default page;
