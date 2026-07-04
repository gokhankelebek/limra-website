import { redirect } from "next/navigation";

// Pre-opening: reservations don't exist yet — route to the updates list.
export default function Page() {
  redirect("/updates");
}
