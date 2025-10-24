import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section - Premium & Luxurious */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center items-center gap-4">
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <span className="text-purple-300 font-semibold tracking-widest text-sm md:text-base uppercase">Premium Crowdfunding</span>
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-blue-400 mb-6 leading-tight tracking-tight">
            BOOSTR
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light mb-4 max-w-4xl mx-auto leading-relaxed">
            Elevate Your Creative Journey
          </p>
          
          <p className="text-base md:text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The premium platform where visionary creators meet passionate supporters. Transform your dreams into reality with the power of community-driven funding.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/login">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full text-lg shadow-2xl shadow-purple-900 hover:shadow-purple-700 hover:scale-105 transform transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            <Link href="/about">
              <button className="px-10 py-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm text-white font-semibold rounded-full text-lg border-2 border-purple-400 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-70 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Discover More
              </button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-slate-700 border-opacity-50">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">10K+</div>
              <div className="text-slate-400 text-sm md:text-base">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">₹50M+</div>
              <div className="text-slate-400 text-sm md:text-base">Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">100K+</div>
              <div className="text-slate-400 text-sm md:text-base">Supporters</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Luxury Design */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-purple-400 font-semibold tracking-widest text-sm uppercase mb-4 block">Why Choose BOOSTR</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-300 mb-6">
              Premium Features for Elite Creators
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              Experience the next generation of creator support with our luxury platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900 group-hover:scale-110 transition-transform duration-300">
                  <Image className="invert" width={48} height={48} src="/man.gif" alt="supporter" unoptimized />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Passionate Community</h3>
                <p className="text-slate-400 leading-relaxed">
                  Connect with a dedicated community of supporters who believe in your vision and are ready to help you succeed.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900 group-hover:scale-110 transition-transform duration-300">
                  <Image className="invert" width={48} height={48} src="/coin.gif" alt="coin" unoptimized />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant Contributions</h3>
                <p className="text-slate-400 leading-relaxed">
                  Receive immediate financial support through our secure and seamless payment system. Your fans are ready to invest in your success.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-900 group-hover:scale-110 transition-transform duration-300">
                  <Image className="invert" width={48} height={48} src="/group.gif" alt="group" unoptimized />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Collaborative Growth</h3>
                <p className="text-slate-400 leading-relaxed">
                  Build meaningful relationships with your supporters and create opportunities for collaboration that amplify your impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Modern & Clean */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold tracking-widest text-sm uppercase mb-4 block">Learn More</span>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-300 mb-6">
              See BOOSTR in Action
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover how creators are transforming their passions into thriving ventures
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900 border border-slate-700 hover:border-purple-500 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            <div className="aspect-video">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" 
                title="BOOSTR Platform Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-950 via-slate-950 to-blue-950 py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-blue-300 mb-6">
            Ready to Amplify Your Impact?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
            Join thousands of creators who are already building their success stories with BOOSTR
          </p>
          <Link href="/login">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full text-xl shadow-2xl shadow-purple-900 hover:shadow-purple-700 hover:scale-110 transform transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
