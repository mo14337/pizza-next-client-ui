"use client";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/logout";

const Logout = () => {
  async function handleLogout() {
    await logout();
  }
  return (
    <Button onClick={handleLogout} size={"sm"}>
      Logout
    </Button>
  );
};

export default Logout;
