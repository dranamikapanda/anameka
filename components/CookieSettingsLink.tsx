"use client";
import { openCookieSettings } from "./Analytics";
export function CookieSettingsLink() {
  return <button onClick={openCookieSettings} className="hover:text-gold-light">Cookie settings</button>;
}
