import { redirect } from "next/navigation";

// Pre-opening: ordering isn't live yet — route to the updates list.
export default function Page() {
  redirect("/updates");
}
