"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";

type Theme = {
    id: string;
    label: string;
    desc: string;
};

interface ThemePickerProps {
    selectedThemes: string[];
    onToggleTheme: (id: string) => void;
}

export default function ThemePicker({ selectedThemes, onToggleTheme }: ThemePickerProps) {
    // ✅ Updated to exactly match the `category` strings in data.ts
    const themes = useMemo<Theme[]>(
        () => [
            { id: "Civics", label: "Civics", desc: "How government works" },
            { id: "Law", label: "Law", desc: "Rules & Due Process" },
            { id: "Elections", label: "Elections", desc: "Voting & Representation" },
            { id: "Rights", label: "Rights", desc: "Freedoms & Limitations" },
            { id: "Media", label: "Media", desc: "Literacy & Fact-checking" },
            { id: "Tech", label: "Tech", desc: "Algorithms & Privacy" },
            { id: "Activism", label: "Activism", desc: "Protest & Organizing" },
            { id: "Corruption", label: "Corruption", desc: "Money in Politics" },
            { id: "History", label: "History", desc: "The fights of the past" },
            { id: "Local", label: "Local", desc: "Cities & Mayors" },
            { id: "Global", label: "Global", desc: "International systems" },
            { id: "Economy", label: "Economy", desc: "Taxes & The Fed" },
        ],
        [],
    );

    return (
        <section
            id="themes"
            className="relative w-full pt-16 pb-8 scroll-mt-28 text-[#141414]">
            
            <div className="container mx-auto px-8">
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 mb-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                            <span className="inline-block w-2 h-2 bg-[#FF4E02]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                Content Filter
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.95]">
                            Select a Topic.
                        </h3>
                    </div>
                    <p className="font-semibold text-black/70 max-w-[35ch] md:text-right text-sm leading-relaxed">
                        Filter the feed below. Choose multiple themes to find exactly what you want to learn today.
                    </p>
                </div>

                {/* The Filter Grid */}
                <div className="mt-8 flex flex-wrap gap-3">
                    {themes.map((t) => {
                        const isSelected = selectedThemes.includes(t.id);

                        return (
                            <button
                                key={t.id}
                                onClick={() => onToggleTheme(t.id)}
                                className={`
                                    group relative flex items-center gap-2 px-4 py-3
                                    text-sm font-black uppercase tracking-tight
                                    transition-all duration-200
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E02]
                                    ${
                                        isSelected
                                            ? "border-2 border-black bg-[#FF4E02] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-y-[2px]"
                                            : "border-2 border-black/20 bg-white text-black/60 hover:border-black hover:text-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]"
                                    }
                                `}>
                                {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                {/* Selected Context Bar */}
                {selectedThemes.length > 0 && (
                    <div className="mt-8 p-4 bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-[6px_6px_0_0_rgba(255,78,2,1)]">
                        <div className="text-sm font-bold uppercase tracking-wide">
                            Showing content for <span className="text-[#FF4E02]">{selectedThemes.length}</span> selected theme{selectedThemes.length > 1 ? 's' : ''}
                        </div>
                        <button 
                            onClick={() => onToggleTheme('CLEAR_ALL')} 
                            className="text-xs font-black uppercase text-white/60 hover:text-white underline decoration-2 underline-offset-4 transition-colors">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}