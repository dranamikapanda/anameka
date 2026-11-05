import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin-auth";
import { getSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/SettingsForm";
export default async function Settings() {
  if (!(await requireStaff("admin"))) redirect("/admin");
  return <><h1 className="mb-8 text-4xl">Website settings</h1><SettingsForm s={await getSettings()} /></>;
}
