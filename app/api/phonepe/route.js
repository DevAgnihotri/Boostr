import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

// Simulated PhonePe callback / checkout endpoint.
// Usage (for testing): redirect the user to `/api/phonepe?orderId=phonepe_123`.
// This will mark the payment as done and redirect back to the app with ?paymentdone=true

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return NextResponse.json({ success: false, message: 'orderId required' }, { status: 400 })
  }

  await connectDb()
  const p = await Payment.findOne({ oid: orderId })
  if (!p) {
    return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 })
  }

  // Simulate successful payment
  p.done = true
  await p.save()

  // Redirect back to user page with a success flag
  const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/${p.to_user}?paymentdone=true`
  return NextResponse.redirect(redirectUrl)
}

export const POST = GET
