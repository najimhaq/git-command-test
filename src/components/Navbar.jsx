'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Menu', path: '/menu' },
  { name: 'Cart', path: '/cart' },
  { name: 'Reservation', path: '/reservation' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActivePath = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const isReservationPage = pathname === '/reservation';

  return (
    <header className='fixed top-0 left-0 z-50 w-full'>
      <nav className='mx-auto mt-4 w-[95%] max-w-7xl rounded-2xl border border-[#C8A96B]/20 bg-[#111111]/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]'>
        <div className='flex items-center justify-between px-4 py-3 md:px-6 lg:px-8'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96B]/40 bg-[#1A1A1A] text-[#C8A96B] shadow-inner'>
              <span className='text-lg font-semibold'>F</span>
            </div>
            <div className='leading-tight'>
              <h2 className='text-lg font-semibold uppercase tracking-[0.18em] text-white'>
                Foodie
              </h2>
              <p className='hidden text-[11px] uppercase tracking-[0.35em] text-[#C8A96B] sm:block'>
                Fine Dining
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 md:flex'>
            {navLinks.map((link) => {
              const isActive = isActivePath(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C8A96B] text-black shadow-md'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Reservation Button */}
          <div className='hidden items-center gap-3 md:flex'>
            <Link
              href='/reservation'
              aria-current={isReservationPage ? 'page' : undefined}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-300 ${
                isReservationPage
                  ? 'border-[#C8A96B] bg-transparent text-[#C8A96B]'
                  : 'border-[#C8A96B] bg-[#C8A96B] text-black hover:bg-transparent hover:text-[#C8A96B]'
              }`}
            >
              <FaPhoneAlt className='text-xs' />
              Reserve Table
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
            aria-expanded={menuOpen}
            className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              viewBox='0 0 24 24'
            >
              {menuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 7h16M4 12h16M4 17h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='space-y-2 px-4 pb-4 pt-2'>
            {navLinks.map((link) => {
              const isActive = isActivePath(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition ${
                    isActive
                      ? 'bg-[#C8A96B] text-black'
                      : 'border border-white/10 bg-white/5 text-white/85 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href='/reservation'
              onClick={() => setMenuOpen(false)}
              aria-current={isReservationPage ? 'page' : undefined}
              className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold tracking-wide transition ${
                isReservationPage
                  ? 'border border-[#C8A96B] bg-transparent text-[#C8A96B]'
                  : 'bg-[#C8A96B] text-black hover:opacity-90'
              }`}
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
