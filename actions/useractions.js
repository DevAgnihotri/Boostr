"use server"

import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({username: to_username})
    // For PhonePe flow: create a local order record and return a simulated payment URL.
    // This avoids calling external APIs and lets the frontend redirect to a server route
    // that simulates PhonePe behavior for testing.

    const orderId = `phonepe_${Date.now()}`

    // amount is expected in paise from the client (same as previous behavior)
    const order = {
        id: orderId,
        amount: Number.parseInt(amount),
        currency: 'INR',
        to_user: to_username,
    }

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: order.id, amount: order.amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message, done: false })

    // Return a simulated checkout URL that points to our new /api/phonepe route
    const paymentUrl = `${process.env.NEXT_PUBLIC_URL}/api/phonepe?orderId=${order.id}`
    return { id: order.id, paymentUrl }

}


export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) return null
    const user = u.toObject()
    // convert ObjectId and Dates to plain strings for client-safe serialization
    if (user._id) user._id = String(user._id)
    if (user.createdAt) user.createdAt = user.createdAt.toISOString()
    if (user.updatedAt) user.updatedAt = user.updatedAt.toISOString()
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
    // convert ObjectIds and Dates to plain strings
    p = p.map(item => ({
        ...item,
        _id: item._id ? String(item._id) : item._id,
        createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : item.createdAt,
        updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : item.updatedAt
    }))
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    // `data` may be either a FormData (from a form POST) or a plain object (when called programmatically).
    let ndata
    try {
        if (data == null) ndata = {}
        else if (typeof data === 'object' && !(data instanceof FormData)) {
            // plain object already
            ndata = data
        } else {
            // FormData or iterable entries
            ndata = Object.fromEntries(data)
        }
    } catch (err) {
        // fallback: ensure ndata is an object
        ndata = {}
    }

    // If videos field is provided as a comma-separated string, convert to array
    if (ndata.videos && typeof ndata.videos === 'string') {
        // Accept comma, whitespace (space/newline) or mixed separators
        ndata.videos = ndata.videos.split(/[\s,]+/).map(s => s.trim()).filter(Boolean)
    }

    // Debug: log incoming videos data type and value (helps troubleshooting)
    try {
        console.log('updateProfile: oldusername=', oldusername, 'ndata.videos=', ndata.videos)
    } catch (err) {
        // ignore logging errors
    }

    // If the username is being updated, check if username is available
    // Determine selector for the existing user. Prefer oldusername; fall back to email if oldusername missing
    let selector = null
    if (oldusername) selector = { username: oldusername }
    else if (ndata.email) selector = { email: ndata.email }

    if (!selector) {
        return { error: 'Missing selector to identify user (oldusername or email required)' }
    }

    // If the username is being updated, check if username is available
    if (ndata.username && selector.username !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
    }

    // update the user record using the selector
    const res = await User.updateOne(selector, ndata)
    console.log('updateProfile: updateOne result=', res)

    // If username changed, update payments to point to the new username
    try {
        const prevUsername = selector.username
        if (prevUsername && ndata.username && prevUsername !== ndata.username) {
            await Payment.updateMany({ to_user: prevUsername }, { to_user: ndata.username })
        }
    } catch (err) {
        console.error('updateProfile: failed to update payments', err)
    }

    return { success: true }

}


