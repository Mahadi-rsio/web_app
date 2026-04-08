"use client"

import { redirect, useParams } from "next/navigation";

export default function Page() {



  const { id } = useParams<{ id: string }>()

  redirect(`/dashboard/database/${id}/overview`);
}
