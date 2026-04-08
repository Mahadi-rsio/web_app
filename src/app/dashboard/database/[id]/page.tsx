import { redirect } from "next/navigation";

export default function Page(): never {
  redirect("/dashboard/database/0/overview");
}
