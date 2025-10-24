import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white">
                <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
                    {/* Hero / Lead */}
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h1 className="text-6xl md:text-7xl font-thin mb-4 tracking-wider">About <span className="text-red-600">BOOSTR</span></h1>
                        <div className="mx-auto w-24 h-0.5 bg-red-600 mb-6 opacity-90"></div>
                        <p className="text-lg md:text-xl font-extralight mb-6 leading-relaxed">
                            BOOSTR is an invitation-only platform built for exceptional creators — a place where patrons directly support meaningful work. We help creators monetize attention, deepen relationships with supporters, and realize ambitious projects with elegant simplicity.
                        </p>
                        <blockquote className="border-l-4 border-red-600 pl-6 italic font-light text-slate-400 mx-auto max-w-3xl">
                            We don&apos;t build for everyone. We build for those who make the world worth looking at.
                        </blockquote>
                    </div>

                    {/* How it works - numbered steps */}
                    <section className="mb-16">
                        <h2 className="text-4xl font-light mb-8 tracking-wide border-l-4 border-red-600 pl-6">How it Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-thin">1</div>
                                <div>
                                    <h3 className="text-2xl font-light mb-2 tracking-wide">Gather a Devoted Audience</h3>
                                    <p className="font-extralight text-slate-400">Grow a small, engaged audience that truly cares about your work — quality over quantity.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-thin">2</div>
                                <div>
                                    <h3 className="text-2xl font-light mb-2 tracking-wide">Offer Support Options</h3>
                                    <p className="font-extralight text-slate-400">Create simple, elegant ways for fans to support you — one-time contributions, subscriptions, or project-backed pledges.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-thin">3</div>
                                <div>
                                    <h3 className="text-2xl font-light mb-2 tracking-wide">Deliver Exclusive Value</h3>
                                    <p className="font-extralight text-slate-400">Provide behind-the-scenes access, early work, or curated rewards that make supporters feel part of the process.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-thin">4</div>
                                <div>
                                    <h3 className="text-2xl font-light mb-2 tracking-wide">Scale With Intention</h3>
                                    <p className="font-extralight text-slate-400">Use real support to fund bigger ideas while staying true to your craft and community.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Two-column features for creators & supporters */}
                    <section className="mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
                            <div>
                                <h2 className="text-3xl font-light mb-6 tracking-wide border-l-4 border-red-600 pl-6">For Creators</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">Direct financial support and predictable revenue from your most loyal fans.</p>
                                    </div>
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">Exclusive tools to engage deeply — messages, limited releases, and collaborator access.</p>
                                    </div>
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">A curated environment for <span className="text-red-600">elite</span> projects and meaningful growth.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-light mb-6 tracking-wide border-l-4 border-red-600 pl-6">For Supporters</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">Be part of the creative journey and unlock exclusive rewards.</p>
                                    </div>
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">Directly impact the ideas you care about — no middlemen, just meaningful support.</p>
                                    </div>
                                    <div className="p-4 border border-red-950 rounded-sm bg-black hover:border-red-600 transition-colors">
                                        <p className="font-extralight text-lg">Access to intimate events, early releases, and creator recognition.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BOOSTR Difference */}
                    <section className="mb-8 max-w-4xl">
                        <h2 className="text-4xl font-light mb-6 tracking-wide border-l-4 border-red-600 pl-6">The BOOSTR Difference</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="font-extralight text-lg border-l border-red-950 pl-6 py-2 hover:border-red-600 transition-colors">Curated community of <span className="text-red-600">ambitious</span> creators</li>
                            <li className="font-extralight text-lg border-l border-red-950 pl-6 py-2 hover:border-red-600 transition-colors">Premium guidance from experienced mentors</li>
                            <li className="font-extralight text-lg border-l border-red-950 pl-6 py-2 hover:border-red-600 transition-colors">Global reach and <span className="text-red-600">recognition</span> for outstanding work</li>
                            <li className="font-extralight text-lg border-l border-red-950 pl-6 py-2 hover:border-red-600 transition-colors">Exclusive events and collaboration opportunities</li>
                        </ul>
                    </section>
                </div>
            </div>
    );
}

export default About;

export const metadata = {
    title: "About - BOOSTR",
}
   