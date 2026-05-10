'use client';
import "./globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {href: '/', label : "Home"}, 
  {href: '/filmy', label : "Films"},
  {href: '/filmy/dodaj', label: "Add Film"}
]



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" >
      <body>
        <nav>
          {navLinks.map(({href,label})=> (
            <Link
              key = {href}
              href = {href}
              className = {pathname === href ? 'active' : ''}>
                {label}
              </Link>
          )
        )}
        </nav>
        <main style = {{padding : '20px'}}>{children}</main>
      </body>
    </html>
  );
}
