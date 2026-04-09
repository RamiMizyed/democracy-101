"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export default function ContributeDialog({
    label,
    buttonClassName,
    contentClassName,
}: {
    label: string;
    buttonClassName?: string;
    contentClassName?: string;
}) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"select" | "form">("select");
    const [selectedRole, setSelectedRole] = useState<{ title: string; hint: string } | null>(null);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setTimeout(() => {
                setStep("select");
                setSelectedRole(null);
            }, 300);
        }
    };

    const handleRoleSelect = (role: { title: string; hint: string }) => {
        setSelectedRole(role);
        setStep("form");
    };

    const roles = [
        { id: "creator", title: "🎬 Creator", hint: "Pitch a video hook or script idea." },
        { id: "educator", title: "🧠 Educator", hint: "Drop research, facts, or lesson outlines." },
        { id: "designer", title: "🎨 Designer", hint: "Link to your portfolio, stickers, or visuals." },
        { id: "general", title: "💡 General", hint: "Just a really good idea for the platform." },
    ];

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className={buttonClassName}>
                {label}
            </Button>

            <DialogContent
                className={[
                    // BUMPED TO max-w-3xl FOR MASSIVE PRESENCE
                    "sm:max-w-2xl md:max-w-3xl w-[95vw] border-2 border-black rounded-none p-0 overflow-hidden",
                    "bg-[#f5efe6] shadow-[12px_12px_0_0_rgba(0,0,0,1)]",
                    contentClassName ?? "",
                ].join(" ")}>
                
                <div className="border-b-2 border-black bg-white px-8 py-6 flex items-center gap-4">
                    {step === "form" && (
                        <button 
                            onClick={() => setStep("select")}
                            className="shrink-0 p-2 hover:bg-black/5 transition-colors border-2 border-transparent hover:border-black"
                            aria-label="Go back">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    )}
                    <DialogTitle className="font-black uppercase tracking-tight text-2xl md:text-3xl">
                        {step === "select" ? "How can you help?" : `Contributing as: ${selectedRole?.title}`}
                    </DialogTitle>
                </div>

                <div className="p-8 md:p-12">
                    {step === "select" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelect(role)}
                                    className="
                                        group flex flex-col items-start text-left
                                        border-2 border-black bg-white p-6 md:p-8
                                        shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                                        transition-all duration-200
                                        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white
                                    ">
                                    <span className="font-black uppercase tracking-tight text-2xl mb-2">
                                        {role.title}
                                    </span>
                                    <span className="text-sm md:text-base font-semibold text-black/70 group-hover:text-white/80 leading-relaxed">
                                        {role.hint}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); }}>
                            
                            <div className="inline-block border-2 border-black bg-[#FF4E02] px-4 py-2 w-max mb-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-black">
                                    {selectedRole?.hint}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input
                                    required
                                    placeholder="Your name"
                                    className="rounded-none border-2 border-black bg-white font-semibold text-lg h-14 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] focus-visible:ring-0 focus-visible:border-[#FF4E02]"
                                />
                                <Input
                                    required
                                    placeholder="Email address"
                                    type="email"
                                    className="rounded-none border-2 border-black bg-white font-semibold text-lg h-14 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] focus-visible:ring-0 focus-visible:border-[#FF4E02]"
                                />
                            </div>
                            
                            <Textarea
                                required
                                placeholder="Describe your idea or paste links to your assets/portfolio here..."
                                rows={8}
                                className="rounded-none border-2 border-black bg-white font-semibold text-lg p-4 resize-none shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] focus-visible:ring-0 focus-visible:border-[#FF4E02]"
                            />

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 mt-2 border-t-2 border-black border-dashed">
                                <p className="text-xs md:text-sm font-black uppercase tracking-[0.18em] text-black/50">
                                    no spam • real humans
                                </p>

                                <Button
                                    type="submit"
                                    className="
                                        w-full sm:w-auto
                                        rounded-none border-2 border-black
                                        bg-[#141414] text-white text-lg font-black uppercase tracking-widest px-10 h-14
                                        shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                                        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#FF4E02] hover:text-black
                                        active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                                        transition-all duration-200
                                    ">
                                    Send It
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}