import { NextResponse } from 'next/server'
import { updateProfile } from '@/actions/useractions'
import connectDb from '@/db/connectDb'

export const POST = async (req) => {
  await connectDb()
  const body = await req.formData()
  const data = Object.fromEntries(body)
  const oldusername = data.oldusername

  try {
    // call the server action function directly
    // Note: updateProfile is exported from actions/useractions.js
    console.log('profile route received data:', data)
    const res = await updateProfile(data, oldusername)
    console.log('profile route updateProfile result:', res)
    return NextResponse.json(res || { success: true })
  } catch (err) {
    console.error('profile update error', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
