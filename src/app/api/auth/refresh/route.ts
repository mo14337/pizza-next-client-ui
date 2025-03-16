import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        cookie: `refreshToken=${cookies().get("refreshToken")?.value}`,
      },
    }
  );
  if (!response.ok) {
    console.log("Failed to refresh access token", response.status);
    return Response.json({ success: false });
  }
  const c = response.headers.getSetCookie();
  const accessToken = c.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));
  if (!accessToken || !refreshToken) {
    console.log("Tokens not found", response.status);
    return Response.json({ success: false });
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
  return Response.json({ success: true });
}
