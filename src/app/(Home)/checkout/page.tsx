import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./_components/CustomerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: { tenant: string };
}) {
  const session = await getSession();
  const queryString = new URLSearchParams(searchParams);
  const existingQueryString = queryString.toString();
  queryString.append("return-to", `/checkout?${existingQueryString}`);
  console.log(queryString);
  if (!session) {
    redirect(`/login?${queryString}`);
  }
  return <CustomerForm />;
}
