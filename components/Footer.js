import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-black text-white flex items-center justify-center px-6 h-20'>
        <p className='text-center font-extralight tracking-wide text-sm'>
          © {currentYear} <span className='text-red-600 font-light'>BOOSTR</span> — For the few who create more.
        </p>
    </footer>
  )
}

export default Footer
