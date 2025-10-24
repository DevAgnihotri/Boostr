"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"
import Image from 'next/image'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments) 
    }


    const pay = async (amount) => {
        // Validate that name and message are provided
        if (!paymentform.name || paymentform.name.length < 3) {
            toast.error('Please enter your name (at least 3 characters)')
            return
        }
        if (!paymentform.message || paymentform.message.length < 4) {
            toast.error('Please enter a message (at least 4 characters)')
            return
        }

        // Create a PhonePe-style order on the server and get a payment URL
        try {
            const a = await initiate(amount, username, paymentform)
            if (!a) {
                toast.error('Failed to create payment order')
                return
            }

            const paymentUrl = a.paymentUrl || a.url
            if (!paymentUrl) {
                toast.error(a.message || 'No payment URL returned')
                return
            }

            // Redirect to simulated PhonePe checkout
            window.location.href = paymentUrl
        } catch (err) {
            console.error('Payment initiation failed', err)
            toast.error('Payment initiation failed')
        }
    }
    
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <div className='min-h-screen bg-black text-white'>
                <div className='cover w-full relative'>
                    <Image className='object-cover w-full h-48 md:h-[350px]' src={currentUser.coverpic || '/default-cover.jpg'} alt="cover" width={1200} height={350} />
                    <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-red-600 overflow-hidden border-2 rounded-full size-36'>
                        <Image className='rounded-full object-cover size-36' width={128} height={128} src={currentUser.profilepic || '/avatar.gif'} alt="profile" />
                    </div>
                </div>
                <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
                    <div className='font-thin text-4xl tracking-wide'>
                        @{username}
                    </div>
                    <div className='font-extralight text-slate-400 tracking-wide'>
                        Support <span className='text-red-600'>{username}</span> on their creative journey
                    </div>
                    <div className='font-light text-slate-400 tracking-wide'>
                        {payments.length} Supporters · <span className='text-red-600'>₹{payments.reduce((a, b) => a + b.amount, 0)}</span> raised
                    </div>

                    <div className="payment flex gap-6 w-[90%] max-w-6xl mt-11 flex-col md:flex-row">
                        <div className="supporters w-full md:w-1/2 bg-black border border-red-950 rounded-sm text-white p-8">
                            <h2 className='text-2xl font-light tracking-wide mb-6 border-l-4 border-red-600 pl-4'>Top Supporters</h2>
                            <ul className='space-y-4'>
                                {payments.length == 0 && <li className='font-extralight text-slate-400'>No supporters yet</li>}
                                {payments.slice(0, 10).map((p, i) => {
                                    return <li key={i} className='flex gap-3 items-start border-l-2 border-red-950 pl-4 py-2 hover:border-red-600 transition-all'>
                                        <Image width={33} height={33} src="/avatar.gif" alt="user avatar" className='rounded-full' />
                                        <span className='font-extralight text-sm'>
                                            <span className='text-red-600 font-light'>{p.name}</span> donated <span className='font-light text-white'>₹{p.amount}</span>
                                            <br />
                                            <span className='text-slate-500 text-xs'>&quot;{p.message}&quot;</span>
                                        </span>
                                    </li>
                                })}
                            </ul>
                        </div>

                        <div className="makePayment w-full md:w-1/2 bg-black border border-red-950 rounded-sm text-white p-8">
                            <h2 className='text-2xl font-light tracking-wide mb-6 border-l-4 border-red-600 pl-4'>Make a Payment</h2>
                            <div className='flex gap-4 flex-col'>
                                <div>
                                    <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-sm bg-black border border-red-950 font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all' placeholder='Your Name' />
                                </div>
                                <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-sm bg-black border border-red-950 font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all' placeholder='Your Message' />

                                <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-sm bg-black border border-red-950 font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all' placeholder='Amount (₹)' />

                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-1 focus:ring-red-600 font-light tracking-wide rounded-sm px-5 py-3 transition-all disabled:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>
                                    Pay Now
                                </button>
                            </div>

                            <div className='flex flex-col md:flex-row gap-3 mt-6'>
                                <button className='bg-black border border-red-950 p-3 rounded-sm font-extralight hover:border-red-600 hover:bg-red-950/10 transition-all' onClick={() => pay(1000)}>₹10</button>
                                <button className='bg-black border border-red-950 p-3 rounded-sm font-extralight hover:border-red-600 hover:bg-red-950/10 transition-all' onClick={() => pay(2000)}>₹20</button>
                                <button className='bg-black border border-red-950 p-3 rounded-sm font-extralight hover:border-red-600 hover:bg-red-950/10 transition-all' onClick={() => pay(3000)}>₹30</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
