import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-[#0F0F0F] flex flex-col items-center justify-center text-white p-6">
            <div className="glass-card p-12 border border-white/10 text-center max-w-lg w-full relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px] pointer-events-none" />

                <h1 className="text-8xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4 relative z-10">
                    404
                </h1>

                <div className="w-16 h-px bg-accent-cyan mx-auto mb-8 relative z-10" />

                <h2 className="text-2xl font-cinzel text-white mb-4 relative z-10">
                    Page Not Found
                </h2>

                <p className="text-gray-400 font-inter mb-8 relative z-10">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-accent-cyan/10 border border-accent-cyan/30 hover:bg-accent-cyan/20 hover:border-accent-cyan/60 text-accent-cyan hover:text-white font-cinzel font-bold rounded-sm transition-all duration-300 tracking-widest relative z-10"
                >
                    RETURN HOME
                </Link>
            </div>
        </div>
    );
}
