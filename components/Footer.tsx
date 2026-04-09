"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#f6f0e8] pt-20 pb-10 border-t-2 border-black text-[#141414]">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-6">
                            <span className="inline-block w-3 h-3 bg-[#FF4E02]" />
                            <span className="font-black uppercase tracking-tight text-xl">
                                Democracy 101
                            </span>
                        </div>
                        <p className="text-lg font-bold leading-tight max-w-[30ch] uppercase">
                            Education built for the feed. <br/>
                            Power back to the people.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-[#FF4E02] mb-6">Explore</h4>
                        <ul className="space-y-4 font-bold uppercase text-sm">
                            <li><Link href="#lessons" className="hover:underline decoration-2">Lessons</Link></li>
                            <li><Link href="#themes" className="hover:underline decoration-2">Themes</Link></li>
                            <li><Link href="#about" className="hover:underline decoration-2">Manifesto</Link></li>
                            <li><Link href="#contribute" className="hover:underline decoration-2">Contribute</Link></li>
                        </ul>
                    </div>

                    {/* Social/Legal Column */}
                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-[#FF4E02] mb-6">Connect</h4>
                        <ul className="space-y-4 font-bold uppercase text-sm">
                            <li><a href="#" className="hover:underline decoration-2">TikTok</a></li>
                            <li><a href="#" className="hover:underline decoration-2">Instagram</a></li>
                            <li><a href="#" className="hover:underline decoration-2">YouTube</a></li>
                            <li><a href="#" className="hover:underline decoration-2">Privacy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t-2 border-black border-dashed flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="text-xs font-black uppercase tracking-widest opacity-40">
                        © {currentYear} Democracy 101 • No Rights Reserved
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 border-2 border-black bg-white text-[10px] font-black uppercase tracking-tighter shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            VOTVS
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                            Built with Chaos & Clarity
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}