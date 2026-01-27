"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})
    const [videosText, setVideosText] = useState('')

    useEffect(() => {
        // redirect to login if there's no session
        if (!session) {
            router.push('/login')
            return
        }

        // fetch user data when session becomes available
        let mounted = true
        const getData = async () => {
            try {
                const u = await fetchuser(session.user.name)
                if (mounted) setform(u || {})
            } catch (err) {
                console.error('Failed to fetch user data', err)
            }
        }

        getData()

        return () => { mounted = false }
    }, [session, router])

    // keep a separate textarea string so typing separators is not disruptive
    useEffect(() => {
        if (form && form.videos) {
            setVideosText(Array.isArray(form.videos) ? form.videos.join(', ') : form.videos)
        }
    }, [form])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formEl = e.currentTarget
        const formData = new FormData(formEl)
        // include current session username as oldusername
        if (session && session.user && session.user.name) formData.set('oldusername', session.user.name)

        try {
            const res = await fetch('/api/profile', { method: 'POST', body: formData })
            const json = await res.json()
            if (json && json.success) {
                toast('Profile Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                    // refresh local form by refetching user (use new username if provided)
                    const newUsername = formData.get('username') || session.user.name
                    const u = await fetchuser(newUsername)
                    if (u) setform(u)

                    // If username changed, navigate to the updated public page so it won't 404
                    try {
                        if (newUsername && session?.user?.name && newUsername !== session.user.name) {
                            // replace current route with the new public profile route
                            router.replace(`/${newUsername}`)
                        }
                    } catch (err) {
                        console.error('Failed to redirect to new username page', err)
                    }
                return
            }

            toast.error(json?.error || 'Failed to update profile')
        } catch (err) {
            console.error('Profile save failed', err)
            toast.error('Profile save failed')
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
                theme="dark"
            />
            <div className='min-h-screen bg-black text-white py-16 px-6'>
                <div className='max-w-2xl mx-auto'>
                    <h1 className='text-center mb-12 text-5xl font-thin tracking-wide'>
                        Your <span className='text-red-600'>BOOSTR</span> Profile
                    </h1>

                    <form className="w-full" onSubmit={handleSubmit}>

                        <div className='my-6'>
                            <label htmlFor="name" className="block mb-2 font-light tracking-wide text-slate-400">Name</label>
                            <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-6">
                            <label htmlFor="email" className="block mb-2 font-light tracking-wide text-slate-400">Email</label>
                            <input value={form.email ? form.email : ""} disabled aria-disabled="true" readOnly type="email" name='email' id="email" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight opacity-60 cursor-not-allowed" />
                        </div>

                        <div className='my-6'>
                            <label htmlFor="username" className="block mb-2 font-light tracking-wide text-slate-400">Username</label>
                            <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-6">
                            <label htmlFor="profilepic" className="block mb-2 font-light tracking-wide text-slate-400">Profile Picture URL</label>
                            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-6">
                            <label htmlFor="coverpic" className="block mb-2 font-light tracking-wide text-slate-400">Cover Picture URL</label>
                            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-6">
                            <label htmlFor="videos" className="block mb-2 font-light tracking-wide text-slate-400">YouTube Videos (comma, space or newline separated URLs)</label>
                            <textarea
                                name="videosText"
                                id="videos"
                                value={videosText}
                                onChange={(e) => setVideosText(e.target.value)}
                                onBlur={() => setform({ ...form, videos: videosText.split(/[\s,]+/).map(s => s.trim()).filter(Boolean) })}
                                className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all"
                                placeholder="https://www.youtube.com/watch?v=... https://youtu.be/... (separate with commas, spaces or new lines)"
                                rows={3}
                            />
                            {/* Hidden input so server-side form submission receives videos text */}
                            <input type="hidden" name="videos" value={videosText} />
                        </div>

                        <div className="my-6">
                            <label htmlFor="razorpayid" className="block mb-2 font-light tracking-wide text-slate-400">Razorpay ID</label>
                            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-6">
                            <label htmlFor="razorpaysecret" className="block mb-2 font-light tracking-wide text-slate-400">Razorpay Secret</label>
                            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-3 bg-black text-white border border-red-950 rounded-sm font-extralight focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:border-red-600 transition-all" />
                        </div>

                        <div className="my-8">
                            <button type="submit" className="block w-full p-3 text-white bg-red-600 rounded-sm hover:bg-red-700 focus:ring-1 focus:ring-red-600 transition-all font-light tracking-wide">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard
