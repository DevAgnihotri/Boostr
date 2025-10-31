import { NextResponse } from "next/server";

// PhonePe simulation removed. Use Razorpay integration instead.
export const GET = async () => {
  return NextResponse.json({ success: false, message: 'PhonePe simulation removed. Use Razorpay.' }, { status: 410 })
}

export const POST = GET
