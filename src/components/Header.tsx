"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Atom, 
  FingerprintPattern, 
  Ghost, 
  HeartHandshake, 
  Menu, 
  X,
  type LucideIcon 
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { triggerContactSlider } from "@/components/RootClientWrapper";

// Base interface for visual layout/positioning for nav items
interface BaseNavItem {
  labelLeft: string;
  labelRight?: string;
  icon: LucideIcon;
}

// Interface for link-based nav items
interface LinkNavItem extends BaseNavItem {
  href: string;
  type: 'link';
  isExternal?: boolean;
}

// Interface for button-based nav items
interface ButtonNavItem extends BaseNavItem {
  type: 'button';
  id: string;
  action: () => void;
}

// Union type: A nav item must be either Link or Button
type NavItemType = LinkNavItem | ButtonNavItem;

interface NavItemUIProps {
  labelLeft: string;
  labelRight?: string;
  Icon: LucideIcon;
  isActive?: boolean;
  isMobile?: boolean;
}

function NavItemUI({ labelLeft, labelRight = '', Icon, isActive, isMobile }: NavItemUIProps) {
  if (isMobile) {
    return (
      <>
        <span>{labelLeft}</span>
        <Icon className={`w-[1.1em] h-[1.1em] stroke-[2.5] mx-1 shrink-0 ${isActive ? "text-white" : "text-zinc-500"}`} />
        <span>{labelRight}</span>
      </>
    );
  }

  return (
    <>
      <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
        <span className="overflow-hidden whitespace-nowrap">{labelLeft}</span>
      </span>
      <Icon className="w-[1.3em] h-[1.3em] stroke-[2.5] text-current mx-[2px] shrink-0" />
      <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
        <span className="overflow-hidden whitespace-nowrap">{labelRight}</span>
      </span>
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItemType[] = [
    { href: '/about', labelLeft: 'AB', labelRight: 'UT', icon: FingerprintPattern, type: 'link' },
    { href: '/projects', labelLeft: 'PR', labelRight: 'JECTS', icon: Atom, type: 'link' },
    { id: 'contact', labelLeft: 'C', labelRight: 'NTACT', icon: HeartHandshake, type: 'button', action: () => triggerContactSlider() },
    { href: '/resume.pdf', labelLeft: 'MY RESU', labelRight: 'É', icon: Ghost, type: 'link', isExternal: true }
  ];

  // Mobile page indicator
  const getCurrentPageIndicator = () => {
    switch (pathname) {
      case "/about":
        return (
          <div className="flex items-center gap-1 text-md font-bold font-mono text-white px-3 py-1 rounded-md border border-[2px] backdrop-blur-md">
            <span>AB</span>
            <FingerprintPattern className="w-[1.2em] h-[1.2em] stroke-[2.5]" />
            <span>UT</span>
          </div>
        );

      case "/projects":
        return (
          <div className="flex items-center gap-1 text-md font-bold font-mono text-white px-3 py-1 rounded-md border border-[2px] backdrop-blur-md">
            <span>PR</span>
            <Atom className="w-[1.2em] h-[1.2em] stroke-[2.5]" />
            <span>JECTS</span>
          </div>
        );
        
      default:
        return null;     
    }
  };

  // Presetting Framer Motion Variants
  const containerVariants: Variants = {
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const childVariants: Variants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: 15, scale: 0.98 }  
  };

  return (
    <header className="relative w-full mb-[30px] z-50">
      <div className="flex justify-between items-center w-full h-12">
        {/* Desktop Logo */}
        <div className="font-bold text-2xl z-50 font-mono tracking-tight">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>jfunki</Link>
        </div>

        {/* Mobile Page Indicator */}
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
          {!isMobileMenuOpen && getCurrentPageIndicator()}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-7 items-center">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              if (item.type === 'link') {
                const isActive = pathname === item.href;
                const sharedClass = `relative transition-all duration-200 flex items-center group p-3 pt-0 text-sm ${
                  isActive ? "text-white font-black" : "opacity-80 hover:opacity-100"
                }`;

                return (
                  <li key={index}>
                    {item.isExternal ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={sharedClass}>
                        <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} isActive={isActive} />
                      </a>
                    ) : (
                      <Link href={item.href} className={sharedClass}>
                        <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} isActive={isActive} />
                      </Link>
                    )}
                  </li>
                );
              }

              // Button render
              return (
                <li key={index}>
                  <button 
                    onClick={() => item.action()} 
                    className="relative transition-all duration-200 flex items-center group p-3 pt-0 text-sm opacity-80 hover:opacity-100 cursor-pointer"
                  >
                    <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger / Close Button */}
        <div className="md:hidden z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu layer"
            className="p-2 text-white/90 hover:text-white focus:outline-none transition-transform active:scale-95 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7 stroke-[2]" />
            ) : (
              <Menu className="w-7 h-7 stroke-[2] hover:scale-110 transition-all" /> 
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 w-screen h-screen bg-zinc-950/80 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 md:hidden"
          >
            <nav className="w-full max-w-xs">
              <motion.ul 
                initial="closed"
                animate="open"
                exit="closed"
                variants={containerVariants}
                className="flex flex-col gap-6 items-center justify-center w-full"
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;

                  if (item.type === 'link') {
                    const isItemActive = pathname === item.href;
                    const mobileClass = `flex items-center justify-center text-2xl font-bold font-mono py-3 border-b border-white/5 w-full ${
                      isItemActive ? "text-white" : "text-zinc-400"
                    }`;

                    return (
                      <motion.li key={index} variants={childVariants} className="w-full text-center">
                        {item.isExternal ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className={mobileClass}>
                            <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} isActive={isItemActive} isMobile />
                          </a>
                        ) : (
                          <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={mobileClass}>
                            <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} isActive={isItemActive} isMobile />
                          </Link>
                        )}
                      </motion.li>
                    );
                  }

                  // Button render for mobile
                  return (
                    <motion.li key={index} variants={childVariants} className="w-full text-center">
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          item.action();
                        }}
                        className="flex items-center justify-center text-2xl font-bold font-mono py-3 border-b border-white/5 w-full text-zinc-400 cursor-pointer"
                      >
                        <NavItemUI labelLeft={item.labelLeft} labelRight={item.labelRight} Icon={Icon} isMobile />
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}