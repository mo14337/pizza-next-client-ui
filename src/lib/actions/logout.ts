"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/auth/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        cookie: `refreshToken=${cookies().get("refreshToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.log("Logout failed", response.status);
    return false;
  }
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  return true;
};
