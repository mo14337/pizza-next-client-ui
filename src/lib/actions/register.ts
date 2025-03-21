/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";

export default async function register(prevState: any, formdata: FormData) {
  const firstName = formdata.get("firstName");
  const lastName = formdata.get("lastName");
  const email = formdata.get("email");
  const password = formdata.get("password");
  // todo: do request data validation

  // call auth service

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
      console.log("error", error);
      return {
        type: "error",
        message: error.errors[0].msg,
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies were found!",
      };
    }

    const parsedAccessToken = parse(accessToken);
    const parsedRefreshToken = parse(refreshToken);

    cookies().set({
      name: "accessToken",
      value: parsedAccessToken.accessToken,
      expires: new Date(parsedAccessToken.expires),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    cookies().set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken,
      expires: new Date(parsedRefreshToken.expires),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Registration successful!",
    };
  } catch (err: any) {
    return {
      type: "error",
      message: err.message,
    };
  }
}
