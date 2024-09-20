"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const Page = () => {
  const { data, refetch } = api.settings.getAdminData.useQuery();
  const { toast } = useToast();

  // State variables for each input field
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const updateAdmin = api.settings.addAttendance.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully updated new password",
      });
      refetch();
      setConfirmNewPassword("");
      setNewPassword("");
      setUsername("");
      setCurrentPassword("");
    },
    onError: () => {
      toast({
        title: "Failed to add new attendance",
      });
    },
  });

  const onSubmit = async () => {
    // Check if the username matches and the current password is incorrect
    if (data?.username !== username) {
      toast({
        title: "Error",
        description: "Username is incorrect.",
      });
      return;
    }

    // Check if the current password matches
    if (data?.password !== currentPassword) {
      toast({
        title: "Error",
        description: "Current password is incorrect.",
      });
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
      });
      return;
    }

    // Proceed with the mutation to update the admin data
    try {
      await updateAdmin.mutateAsync({
        id: data?.id || 0,
        username: username,
        password: newPassword,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin credentials.",
      });
    }
  };

  return (
    <div className="h-screen w-full items-center justify-center p-20">
      <div className="relative my-10 flex w-full flex-col items-start gap-5 rounded-md bg-teal-700 px-10 pl-24">
        <img
          width={50}
          src="/logo.jpg"
          className="absolute right-5 top-5 rounded-full"
        />

        <img
          width={400}
          src="/tree.png"
          className="absolute right-0 top-72 rounded-full"
        />
        <div className="flex flex-col gap-5 p-10">
          <Label className="py-10 font-extrabold tracking-widest text-orange-400">
            Manage password of admin
          </Label>
          <div className="flex flex-col justify-between gap-1">
            <Label className="text-xs text-white">username:</Label>
            <Input
              className="w-96"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-between gap-1">
            <Label className="text-xs text-white">current password:</Label>
            <Input
              type="password"
              className="w-96"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <Label className="text-xs text-white">new password:</Label>
            <Input
              type="password"
              className="w-96"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <Label className="text-xs text-white">confirm new password:</Label>
            <Input
              type="password"
              className="w-96"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <Button className="my-4" onClick={onSubmit}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
