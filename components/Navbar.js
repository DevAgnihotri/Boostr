"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-slate-950 bg-opacity-80 backdrop-blur-xl border-b border-slate-800 shadow-2xl shadow-purple-900'>
      <div className='max-w-7xl mx-auto px-6 md:px-8'>
        <div className='flex justify-between items-center h-20'>
          
          {/* Logo Section - Premium */}
          <Link className="group logo font-bold text-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300" href={"/"}>
            <div className='relative w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900 group-hover:shadow-purple-700 transition-all duration-300'>
              <span className='text-2xl font-black text-white'>B</span>
            </div>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300 font-extrabold tracking-tight'>
              BOOSTR
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className='hidden md:flex items-center gap-8'>
            <Link href="/" className='text-slate-300 hover:text-purple-400 font-medium transition-colors duration-300 hover:scale-110 transform'>
              Home
            </Link>
            <Link href="/about" className='text-slate-300 hover:text-purple-400 font-medium transition-colors duration-300 hover:scale-110 transform'>
              About
            </Link>
          </div>

          {/* Auth Section - Premium */}
          <div className='relative flex items-center gap-4'>
            {session && (
              <>
                {/* Account Dropdown Button */}
                <button 
                  onClick={() => setShowdropdown(!showdropdown)} 
                  onBlur={() => {
                    setTimeout(() => {
                      setShowdropdown(false)
                    }, 200);
                  }} 
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-800 bg-opacity-50 backdrop-blur-sm text-slate-200 font-semibold rounded-full border border-slate-700 hover:border-purple-500 hover:bg-opacity-70 transition-all duration-300 shadow-lg hover:shadow-purple-900"
                  type="button"
                >
                  <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className='hidden lg:inline'>Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - Luxury */}
                <div className={`${showdropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"} absolute right-0 top-16 w-56 bg-slate-900 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900 border border-slate-700 transition-all duration-300 overflow-hidden`}>
                  <div className='p-4 border-b border-slate-700'>
                    <p className='text-slate-400 text-xs font-medium uppercase tracking-wider mb-1'>Signed in as</p>
                    <p className='text-white font-semibold truncate'>{session.user.email}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-transparent transition-all duration-300">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className='font-medium'>Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-transparent transition-all duration-300">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className='font-medium'>Your Page</span>
                      </Link>
                    </li>
                    <li className='border-t border-slate-700 mt-2 pt-2'>
                      <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-900 hover:to-transparent transition-all duration-300">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className='font-medium'>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Mobile Logout Button */}
                <button 
                  className='md:hidden px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-full shadow-lg shadow-red-900 hover:shadow-red-700 hover:scale-105 transform transition-all duration-300' 
                  onClick={() => { signOut() }}
                >
                  Logout
                </button>
              </>
            )}

            {!session && (
              <Link href={"/login"}>
                <button className='group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg shadow-purple-900 hover:shadow-purple-700 hover:scale-105 transform transition-all duration-300 overflow-hidden'>
                  <span className='relative z-10 flex items-center gap-2'>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
