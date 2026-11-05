export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+917992512533",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917992512533",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "anamekaspanda5@gmail.com",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  city: process.env.NEXT_PUBLIC_BUSINESS_CITY ?? "Bhubaneswar",
  region: process.env.NEXT_PUBLIC_BUSINESS_REGION ?? "Odisha",
  mapsEmbed: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
};
export const hasSupabase = Boolean(env.supabaseUrl && env.supabaseAnon);
export const formatPhone = (p: string) => p.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");
export const waLink = (text?: string) =>
  `https://wa.me/${env.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
