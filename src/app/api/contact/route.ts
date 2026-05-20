import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req: NextRequest) {
  if (!SCRIPT_URL) {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  let body: { nama?: string; wa?: string; description?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { nama, wa, description } = body;

  if (!nama?.trim() || !wa?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!/^[a-zA-Z\s]+$/.test(nama) || nama.length > 20) {
    return NextResponse.json({ error: "invalid_nama" }, { status: 400 });
  }

  if (!/^\d+$/.test(wa) || !wa.startsWith("08") || wa.length < 10 || wa.length > 16) {
    return NextResponse.json({ error: "invalid_wa" }, { status: 400 });
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: nama.trim(), wa: wa.trim(), description: (description ?? "").trim() }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
