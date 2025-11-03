import connectDb from '@/db/connectDb'
import User from '@/models/User'
import Image from 'next/image'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'

// Force dynamic rendering in production so new creators appear immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Creators - BOOSTR',
}

export default async function CreatorsPage() {
  // Disable caching of this route
  noStore()
  // server component: fetch creators from DB
  await connectDb()
  let users = []
  try {
    users = await User.find({}).sort({ createdAt: -1 }).limit(200).lean()
  } catch (err) {
    // fail silently and render empty list
    console.error('Failed to load creators', err)
    users = []
  }

  // normalize fields for safe rendering
  users = users.map(u => ({
    username: u.username,
    name: u.name || u.username,
    profilepic: u.profilepic || '/avatar.gif'
  }))

  return (
    <div className='min-h-screen bg-black text-white py-20'>
      <div className='max-w-7xl mx-auto px-6 md:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='text-4xl font-thin tracking-wide'>Creators</h1>
          <p className='text-slate-400 mt-3 font-extralight'>Browse creators on Boostr — click a card to visit their page.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {users.length === 0 && (
            <div className='col-span-full text-center text-slate-400 font-extralight'>No creators found.</div>
          )}

          {users.map((u) => (
            <Link key={u.username} href={`/${u.username}`} className='group bg-black border border-red-950 rounded-sm p-6 flex flex-col items-center gap-6 hover:border-red-600 hover:bg-red-600 hover:bg-opacity-20 hover:scale-105 transition-all duration-200'>
              <div className='w-36 h-36 rounded-full overflow-hidden border-2 border-red-800 flex items-center justify-center'>
                <Image unoptimized src={u.profilepic} alt={u.name} width={144} height={144} className='object-cover w-full h-full' />
              </div>
              <div className='text-center'>
                <div className='font-thin text-2xl tracking-wide'>@{u.username}</div>
                <div className='text-slate-400 text-base font-extralight mt-2 group-hover:text-white'>{u.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
