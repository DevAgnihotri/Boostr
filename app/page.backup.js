"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
      <section className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-opacity-60 to-black opacity-80 z-10"></div>
          <video 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-20 text-center px-6">
          <h1 className="text-8xl md:text-9xl lg:text-[14rem] font-thin text-white mb-6 tracking-[0.05em] leading-none">
            BOOSTR
          </h1>
          
          <p className="text-xl md:text-2xl text-red-500 font-extralight mb-12 tracking-[0.3em] uppercase">
            For the Few Who Create More
          </p>

          <Link href="/login">
            <button className="group relative px-12 py-4 bg-transparent text-white font-extralight text-sm uppercase tracking-[0.4em] border border-white hover:bg-red-600 hover:border-red-600 transition-all duration-700">
              Apply as a Creator
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-px h-24 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative bg-black py-48 md:py-64 px-6 border-t border-red-950">
        <div className="max-w-6xl mx-auto text-center space-y-32">
          <div className="scroll-fade opacity-0 transition-all duration-1000">
            <p className="text-5xl md:text-7xl font-thin text-white leading-relaxed tracking-wide">
              Not everyone gets to <span className="text-red-600 font-light">create.</span>
            </p>
          </div>
          <div className="scroll-fade opacity-0 transition-all duration-1000 delay-200">
            <p className="text-5xl md:text-7xl font-thin text-white leading-relaxed tracking-wide">
              Not everyone gets to be <span className="text-red-600 font-light">seen.</span>
            </p>
          </div>
          <div className="scroll-fade opacity-0 transition-all duration-1000 delay-300">
            <p className="text-5xl md:text-7xl font-thin text-white leading-relaxed tracking-wide">
              BOOSTR is where <span className="text-red-600 font-normal">art earns its power.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Creators in Focus */}
      <section className="relative bg-gradient-to-b from-black via-red-950 via-opacity-10 to-black py-40 md:py-56 px-6 border-t border-red-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 scroll-fade opacity-0 transition-all duration-1000">
            <h2 className="text-7xl md:text-8xl font-thin text-white mb-8 tracking-[0.1em]">
              Portraits of <span className="text-red-600 font-light">Ambition</span>
            </h2>
            <div className="w-40 h-px bg-red-600 mx-auto"></div>
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

      {/* The Experience Section */}
      <section className="relative bg-black py-40 md:py-56 px-6 border-t border-red-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-32 scroll-fade opacity-0">
            <h2 className="text-7xl md:text-8xl font-thin text-white mb-10 tracking-[0.1em]">
              The <span className="text-red-600 font-light">BOOSTR</span> Difference
            </h2>
            <p className="text-2xl text-red-400 font-extralight italic tracking-widest">Exclusivity. Empowerment. Excellence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 md:gap-28">
            {/* Feature 1 */}
            <div className="scroll-fade opacity-0 group text-left space-y-6 border-l border-red-900 pl-12 hover:border-red-600 transition-colors duration-700">
              <h3 className="text-4xl font-light text-white tracking-wider">Elite <span className="text-red-600">Community</span></h3>
              <p className="text-slate-400 leading-relaxed font-extralight text-lg tracking-wide">
                Join a curated network of creators who share your ambition. Private forums, exclusive events, collaboration opportunities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="scroll-fade opacity-0 delay-100 group text-left space-y-6 border-l border-red-900 pl-12 hover:border-red-600 transition-colors duration-700">
              <h3 className="text-4xl font-light text-white tracking-wider">Better <span className="text-red-600">Funding</span></h3>
              <p className="text-slate-400 leading-relaxed font-extralight text-lg tracking-wide">
                Keep more of what you earn. Transparent fees, instant payouts, premium supporter experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="scroll-fade opacity-0 delay-200 group text-left space-y-6 border-l border-red-900 pl-12 hover:border-red-600 transition-colors duration-700">
              <h3 className="text-4xl font-light text-white tracking-wider">Global <span className="text-red-600">Reach</span></h3>
              <p className="text-slate-400 leading-relaxed font-extralight text-lg tracking-wide">
                Your work deserves a worldwide audience. BOOSTR amplifies exceptional creators across continents.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="scroll-fade opacity-0 delay-300 group text-left space-y-6 border-l border-red-900 pl-12 hover:border-red-600 transition-colors duration-700">
              <h3 className="text-4xl font-light text-white tracking-wider">Premium <span className="text-red-600">Support</span></h3>
              <p className="text-slate-400 leading-relaxed font-extralight text-lg tracking-wide">
                Dedicated success team, growth consulting, brand partnerships. We invest in your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="relative bg-gradient-to-b from-black via-red-950 via-opacity-5 to-black py-48 md:py-64 px-6 overflow-hidden border-t border-red-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center scroll-fade opacity-0">
          <h2 className="text-7xl md:text-9xl font-thin text-white mb-12 leading-tight tracking-wide">
            You don&apos;t apply<br/>
            <span className="text-red-600 font-light">to fit in.</span>
          </h2>
          <p className="text-5xl md:text-7xl font-thin text-white mb-24 tracking-wider">
            You apply to <span className="text-red-600 italic font-light">stand out.</span>
          </p>

          <Link href="/login">
            <button className="group relative px-20 py-6 bg-transparent text-white font-extralight text-lg uppercase tracking-[0.4em] hover:bg-red-600 transition-all duration-700 border border-white hover:border-red-600">
              Apply as a Creator
            </button>
          </Link>

          <p className="text-slate-600 text-sm mt-20 font-extralight tracking-[0.3em] uppercase">
            Applications reviewed within 48 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-black py-24 px-6 border-t border-red-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h3 className="text-4xl font-thin text-white tracking-[0.2em]">BOOSTR</h3>
            <p className="text-red-600 text-xs uppercase tracking-[0.4em] mt-4 font-extralight">For the Few Who Create More</p>
          </div>
          
          <div className="flex justify-center gap-16 mb-12">
            <Link href="/about" className="text-slate-600 hover:text-red-600 text-sm uppercase tracking-[0.3em] font-extralight transition-colors duration-500">About</Link>
            <Link href="/login" className="text-slate-600 hover:text-red-600 text-sm uppercase tracking-[0.3em] font-extralight transition-colors duration-500">Login</Link>
          </div>

          <p className="text-slate-800 text-xs font-extralight tracking-wider">
            © 2025 BOOSTR. All rights reserved.
          </p>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
      {/* Hero Section - Full Screen Video Background */}
      <section className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background - Will shrink on scroll */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-10"></div>
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-20 text-center px-6">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-thin text-white mb-6 tracking-wider">
            BOOSTR
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 font-extralight mb-12 tracking-widest uppercase">
            For the Few Who Create More
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

      {/* Philosophy Section - Brighter & Minimal */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-40 md:py-56 px-6 border-t border-slate-700">
        <div className="max-w-5xl mx-auto text-center space-y-24">
          <div className="opacity-90 hover:opacity-100 transition-opacity duration-700">
            <p className="text-4xl md:text-6xl font-extralight text-white leading-relaxed tracking-wide">
              Not everyone gets to create.
            </p>
          </div>
          <div className="opacity-90 hover:opacity-100 transition-opacity duration-700">
            <p className="text-4xl md:text-6xl font-extralight text-white leading-relaxed tracking-wide">
              Not everyone gets to be seen.
            </p>
          </div>
          <div className="opacity-90 hover:opacity-100 transition-opacity duration-700">
            <p className="text-4xl md:text-6xl font-extralight text-white leading-relaxed tracking-wide">
              BOOSTR is where <span className="text-red-500 font-light">art earns its power.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Creators in Focus - Brighter Design */}
      <section className="relative bg-gradient-to-b from-slate-800 to-slate-700 py-32 md:py-44 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-thin text-white mb-6 tracking-wider">
              Portraits of Ambition
            </h2>
            <div className="w-32 h-px bg-red-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Creator Card 1 */}
            <div className="group relative aspect-square bg-slate-900 overflow-hidden cursor-pointer border border-slate-600 hover:border-red-500 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black group-hover:from-red-600 group-hover:to-red-700 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-32 h-32 border-2 border-white group-hover:border-white rounded-full mb-8 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-5xl font-thin text-white transition-colors duration-700">A</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-3 tracking-wide group-hover:scale-105 transition-transform duration-700">The Visionary</h3>
                <p className="text-slate-300 text-sm font-extralight tracking-wider">Artists who redefine boundaries</p>
              </div>
            </div>

            {/* Creator Card 2 */}
            <div className="group relative aspect-square bg-slate-900 overflow-hidden cursor-pointer border border-slate-600 hover:border-red-500 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black group-hover:from-red-600 group-hover:to-red-700 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-32 h-32 border-2 border-white group-hover:border-white rounded-full mb-8 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-5xl font-thin text-white transition-colors duration-700">B</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-3 tracking-wide group-hover:scale-105 transition-transform duration-700">The Innovator</h3>
                <p className="text-slate-300 text-sm font-extralight tracking-wider">Creators who build the future</p>
              </div>
            </div>

            {/* Creator Card 3 */}
            <div className="group relative aspect-square bg-slate-900 overflow-hidden cursor-pointer border border-slate-600 hover:border-red-500 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black group-hover:from-red-600 group-hover:to-red-700 transition-all duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-32 h-32 border-2 border-white group-hover:border-white rounded-full mb-8 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  <span className="text-5xl font-thin text-white transition-colors duration-700">C</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-3 tracking-wide group-hover:scale-105 transition-transform duration-700">The Pioneer</h3>
                <p className="text-slate-300 text-sm font-extralight tracking-wider">Trailblazers who inspire millions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience Section - Brighter */}
      <section className="relative bg-gradient-to-b from-slate-700 to-slate-600 py-32 md:py-44 px-6 border-t border-slate-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-thin text-white mb-8 tracking-wider">
              The <span className="text-red-500 font-light">BOOSTR</span> Difference
            </h2>
            <p className="text-2xl text-slate-300 font-extralight italic tracking-wide">Exclusivity. Empowerment. Excellence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Feature 1 */}
            <div className="group text-center md:text-left space-y-5 border-l border-slate-400 pl-10 hover:border-red-500 transition-colors duration-500">
              <h3 className="text-4xl font-light text-white tracking-wide">Elite Community</h3>
              <p className="text-slate-300 leading-relaxed font-extralight text-lg">
                Join a curated network of creators who share your ambition. Private forums, exclusive events, collaboration opportunities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center md:text-left space-y-5 border-l border-slate-400 pl-10 hover:border-red-500 transition-colors duration-500">
              <h3 className="text-4xl font-light text-white tracking-wide">Better Funding Terms</h3>
              <p className="text-slate-300 leading-relaxed font-extralight text-lg">
                Keep more of what you earn. Transparent fees, instant payouts, premium supporter experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center md:text-left space-y-5 border-l border-slate-400 pl-10 hover:border-red-500 transition-colors duration-500">
              <h3 className="text-4xl font-light text-white tracking-wide">Global Reach</h3>
              <p className="text-slate-300 leading-relaxed font-extralight text-lg">
                Your work deserves a worldwide audience. BOOSTR amplifies exceptional creators across continents.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group text-center md:text-left space-y-5 border-l border-slate-400 pl-10 hover:border-red-500 transition-colors duration-500">
              <h3 className="text-4xl font-light text-white tracking-wide">Premium Support</h3>
              <p className="text-slate-300 leading-relaxed font-extralight text-lg">
                Dedicated success team, growth consulting, brand partnerships. We invest in your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section - Brighter Final CTA */}
      <section className="relative bg-gradient-to-b from-slate-600 to-slate-500 py-40 md:py-56 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-thin text-white mb-10 leading-tight tracking-wide">
            You don&apos;t apply<br/>
            <span className="text-red-500 font-light">to fit in.</span>
          </h2>
          <p className="text-4xl md:text-6xl font-extralight text-white mb-20 tracking-wide">
            You apply to <span className="italic">stand out.</span>
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

      {/* Footer - Minimal & Bright */}
      <section className="bg-slate-800 py-20 px-6 border-t border-slate-600">
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
