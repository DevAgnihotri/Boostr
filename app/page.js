"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-fade');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* Hero Section - Full Screen Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* overlay removed so hero video shows at full brightness; text retains textShadow for legibility */}
          <video 
            className="absolute inset-0 w-full h-full object-cover" 
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content */}
  <div className="relative z-30 text-center px-6 md:px-12 max-w-6xl mx-auto">
          <h1 className="text-8xl md:text-9xl lg:text-[14rem] font-thin text-white mb-6 tracking-[0.05em] leading-none" style={{textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)'}}>
            BOOSTR
          </h1>
          
          <p className="text-xl md:text-2xl text-red-500 font-extralight italic mb-4 tracking-[0.3em] uppercase">
            For the Few Who <span className="text-red-600">Create</span> More
          </p>
          
          <div className="w-24 h-px bg-red-600 mx-auto mb-16"></div>
          
          <p className="text-lg md:text-xl text-white font-light mb-16 max-w-2xl mx-auto tracking-wide leading-relaxed">
            An exclusive platform where exceptional creators are <span className="text-red-600">seen</span>, supported, and celebrated.
          </p>

          <Link href="/login">
            <button className="group relative px-10 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white font-light text-sm uppercase tracking-[0.3em] border border-white border-opacity-40 hover:bg-white hover:text-black transition-all duration-500">
              Apply as a Creator
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative bg-black py-48 md:py-64 px-6 border-t border-red-950">
        <div className="max-w-5xl mx-auto text-center space-y-28">
          <div className="scroll-fade opacity-0">
            <p className="text-5xl md:text-7xl font-extralight text-white leading-relaxed tracking-wide">
              Not everyone gets to <span className="text-red-600">create</span>.
            </p>
          </div>
          <div className="scroll-fade opacity-0 delay-200">
            <p className="text-5xl md:text-7xl font-extralight text-white leading-relaxed tracking-wide">
              Not everyone gets to be <span className="text-red-600">seen</span>.
            </p>
          </div>
          <div className="scroll-fade opacity-0 delay-300">
            <p className="text-5xl md:text-7xl font-extralight text-white leading-relaxed tracking-wide">
              BOOSTR is where <span className="text-red-600 font-light">Ambition</span> earns its power.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Luxury Design */}
      <section className="bg-black py-40 md:py-56 px-6 border-t border-red-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-7xl md:text-8xl font-thin text-white mb-8 tracking-[0.1em]">
              Portraits of <span className="text-red-600">Ambition</span>
            </h2>
            <div className="w-32 h-px bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Creator Card 1 */}
            <div className="scroll-fade opacity-0 group relative aspect-square bg-black overflow-hidden cursor-pointer border border-red-950 hover:border-red-600 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-red-950 opacity-80 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-36 h-36 border border-red-600 group-hover:border-white rounded-full mb-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-6xl font-thin text-red-600 group-hover:text-white transition-colors duration-700">A</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-4 tracking-wider group-hover:scale-105 transition-transform duration-700">The Visionary</h3>
                <p className="text-red-300 text-sm font-extralight tracking-widest">Artists who redefine boundaries</p>
              </div>
            </div>

            {/* Creator Card 2 */}
            <div className="scroll-fade opacity-0 delay-200 group relative aspect-square bg-black overflow-hidden cursor-pointer border border-red-950 hover:border-red-600 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-red-950 opacity-80 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-36 h-36 border border-red-600 group-hover:border-white rounded-full mb-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-6xl font-thin text-red-600 group-hover:text-white transition-colors duration-700">B</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-4 tracking-wider group-hover:scale-105 transition-transform duration-700">The Innovator</h3>
                <p className="text-red-300 text-sm font-extralight tracking-widest">Creators who build the future</p>
              </div>
            </div>

            {/* Creator Card 3 */}
            <div className="scroll-fade opacity-0 delay-300 group relative aspect-square bg-black overflow-hidden cursor-pointer border border-red-950 hover:border-red-600 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-red-950 opacity-80 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-36 h-36 border border-red-600 group-hover:border-white rounded-full mb-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-6xl font-thin text-red-600 group-hover:text-white transition-colors duration-700">C</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-4 tracking-wider group-hover:scale-105 transition-transform duration-700">The Pioneer</h3>
                <p className="text-red-300 text-sm font-extralight tracking-widest">Trailblazers who inspire millions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-b from-black via-red-950 via-opacity-5 to-black py-48 md:py-64 px-6 overflow-hidden border-t border-red-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center scroll-fade opacity-0">
          <h2 className="text-7xl md:text-9xl font-thin text-white mb-12 leading-tight tracking-wide">
            You don&apos;t apply<br/>
            <span className="text-red-600 font-light">to fit in.</span>
          </h2>
          <p className="text-4xl md:text-6xl font-extralight text-white mb-24 tracking-wide">
            You apply to <span className="italic text-red-600">stand out</span>.
          </p>

          <Link href="/login">
            <button className="group relative px-16 py-6 bg-white text-black font-light text-lg uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 border-2 border-white hover:border-white">
              Apply as a Creator
              <div className="absolute inset-0 border border-white transform scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
            </button>
          </Link>

          <p className="text-slate-400 text-sm mt-16 font-extralight tracking-widest uppercase">
            Applications reviewed within 48 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-black py-20 px-6 border-t border-red-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-10">
            <h3 className="text-3xl font-thin text-white tracking-widest">BOOSTR</h3>
            <p className="text-red-500 text-xs uppercase tracking-[0.3em] mt-3 font-extralight">For the Few Who Create More</p>
          </div>
          
          <div className="flex justify-center gap-12 mb-10">
            <Link href="/about" className="text-slate-400 hover:text-white text-sm uppercase tracking-[0.2em] font-extralight transition-colors duration-300">About</Link>
            <Link href="/login" className="text-slate-400 hover:text-white text-sm uppercase tracking-[0.2em] font-extralight transition-colors duration-300">Login</Link>
          </div>

          <p className="text-slate-500 text-xs font-extralight">
            © 2025 BOOSTR. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}
