import { NextRequest, NextResponse } from "next/server";

const url = "https://unnatvega.vercel.app/";

const links: Record<string, string> = {
  // Instagram
  ig: "?utm_source=instagram&utm_medium=social&utm_campaign=profile",
  ig_dm: "?utm_source=instagram&utm_medium=social&utm_campaign=DM",

  // WhatsApp
  wa: "?utm_source=whatsapp&utm_medium=messaging&utm_campaign=export+group",
  wa_status: "?utm_source=whatsapp&utm_medium=messaging&utm_campaign=status",
  wa_dm: "?utm_source=whatsapp&utm_medium=messaging&utm_campaign=DM",

  // Facebook
  fb: "?utm_source=facebook&utm_medium=social&utm_campaign=bio",
  fb_group:
    "?utm_source=facebook&utm_medium=social&utm_campaign=export+group",
  fb_dm: "?utm_source=facebook&utm_medium=social&utm_campaign=DM",

  // LinkedIn
  li: "?utm_source=linkedin&utm_medium=social&utm_campaign=profile",
  li_dm: "?utm_source=linkedin&utm_medium=social&utm_campaign=DM",
  li_post: "?utm_source=linkedin&utm_medium=social&utm_campaign=post",

  // Google My Business
  GMB: "?utm_source=google&utm_medium=organic&utm_campaign=gmb",

  test: "?utm_source=Done+by+arjav",
};

type RouteContext = {
  params: Promise<{
    UTMmanager: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { UTMmanager } = await params;

  const destination = links[UTMmanager];

  if (!destination) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }

  return NextResponse.redirect(`${url}${destination}`, 308);
}