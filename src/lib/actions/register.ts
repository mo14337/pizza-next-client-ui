/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";

export default async function register(prevState: any, formdata: FormData) {
  const firstName = formdata.get("firstName")?.toString().trim();
  const lastName = formdata.get("lastName")?.toString().trim();
  const email = formdata.get("email")?.toString().trim();
  const password = formdata.get("password")?.toString().trim();

  if (!firstName || firstName.length < 2) {
    return {
      type: "error",
      message: "First name must be at least 2 characters long.",
    };
  }
  if (!lastName || lastName.length < 2) {
    return {
      type: "error",
      message: "Last name must be at least 2 characters long.",
    };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { type: "error", message: "Invalid email format." };
  }
  if (!password || password.length < 6) {
    return {
      type: "error",
      message: "Password must be at least 6 characters long.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: "customer",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors?.[0]?.msg || "Registration failed.",
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return { type: "error", message: "No cookies were found!" };
    }

    const parsedAccessToken = parse(accessToken);
    const parsedRefreshToken = parse(refreshToken);

    cookies().set({
      name: "accessToken",
      value: parsedAccessToken.accessToken,
      expires: new Date(parsedAccessToken.expires),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    cookies().set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken,
      expires: new Date(parsedRefreshToken.expires),
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return { type: "success", message: "Registration successful!" };
  } catch (err: any) {
    return { type: "error", message: err.message };
  }
}
