export function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
                <p className="text-sm ">
                © {currentYear} Jacky Fung; Built with Nextjs & deployed on Vercel 
                </p>
            </div>
        </footer>
    );
}
