import { cookies } from "next/headers";
import { IUser } from "./types";
interface Session {
  user: IUser;
}

const getSelf = async (): Promise<Session | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/auth/self`,
    {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    }
  );
  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as IUser,
  };
};
export const getSession = async () => {
  return await getSelf();
};
