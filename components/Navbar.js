"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-xl border-b border-red-900 border-opacity-30'>
      <div className='max-w-7xl mx-auto px-6 md:px-8'>
        <div className='flex justify-between items-center h-20'>
          
          {/* Logo Section - Luxury Minimal */}
          <Link className="group logo font-thin text-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300" href={"/"}>
            <div className='relative w-10 h-10 bg-red-600 flex items-center justify-center transition-all duration-300 group-hover:bg-white'>
              <span className='text-xl font-thin text-white group-hover:text-black transition-colors duration-300'>B</span>
            </div>
            <span className='text-white font-thin tracking-wide uppercase'>
              BOOSTR
            </span>
          </Link>

          {/* Navigation Links - Minimal */}
          <div className='hidden md:flex items-center gap-10'>
            <Link href="/" className='text-slate-400 hover:text-white font-medium uppercase text-sm tracking-widest transition-colors duration-300'>
              Home
            </Link>
            <Link href="/about" className='text-slate-400 hover:text-white font-medium uppercase text-sm tracking-widest transition-colors duration-300'>
              About
            </Link>
          </div>

          {/* Auth Section - Luxury Minimal */}
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
                  className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-red-900 bg-opacity-20 text-white font-light border border-red-900 border-opacity-30 hover:bg-red-600 hover:border-red-600 transition-all duration-300 uppercase text-sm tracking-wider"
                  type="button"
                >
                  <div className='w-8 h-8 bg-red-600 flex items-center justify-center text-white font-thin text-sm'>
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className='hidden lg:inline'>Account</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - Luxury Minimal */}
                <div className={`${showdropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"} absolute right-0 top-16 w-64 bg-black bg-opacity-95 backdrop-blur-xl border border-red-900 border-opacity-30 transition-all duration-300 overflow-hidden`}>
                  <div className='p-5 border-b border-red-900 border-opacity-30'>
                    <p className='text-slate-500 text-xs font-medium uppercase tracking-widest mb-1'>Signed in</p>
                    <p className='text-white font-semibold truncate'>{session.user.email}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link href="/dashboard" className="flex items-center gap-3 px-5 py-4 text-slate-400 hover:text-white hover:bg-red-900 hover:bg-opacity-20 transition-all duration-300 border-l-2 border-transparent hover:border-red-600">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className='font-medium uppercase text-sm tracking-wide'>Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} className="flex items-center gap-3 px-5 py-4 text-slate-400 hover:text-white hover:bg-red-900 hover:bg-opacity-20 transition-all duration-300 border-l-2 border-transparent hover:border-red-600">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className='font-medium uppercase text-sm tracking-wide'>Your Page</span>
                      </Link>
                    </li>
                    <li className='border-t border-red-900 border-opacity-30 mt-2 pt-2'>
                      <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:text-white hover:bg-red-900 hover:bg-opacity-20 transition-all duration-300 border-l-2 border-transparent hover:border-red-600">
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className='font-medium uppercase text-sm tracking-wide'>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Mobile Logout Button */}
                <button 
                  className='md:hidden px-6 py-2.5 bg-red-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300' 
                  onClick={() => { signOut() }}
                >
                  Logout
                </button>
              </>
            )}

            {!session && (
              <Link href={"/login"}>
                <button className='group relative px-8 py-3 bg-red-600 text-white font-bold uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 border-2 border-red-600 hover:border-white overflow-hidden'>
                  <span className='relative z-10'>Login</span>
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
