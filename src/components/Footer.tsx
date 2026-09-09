export function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
                <p className="text-sm text-slate-400">
                © 2026 {currentYear} Jacky Fung; Built with Nextjs & deployed on Vercel 
                </p>
            </div>
        </footer>
    );
}