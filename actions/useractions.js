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
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{

        
        await User.updateOne({email: ndata.email}, ndata)
    }


}


