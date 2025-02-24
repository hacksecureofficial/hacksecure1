'use client'

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Footer() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/user');
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    };
    checkUser();
  }, []);

  const handleLinkClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      router.push('/signin');
    }
  };

  return (
    <footer className="bg-black text-white py-8 border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-2xl font-bold">HACK SEC</Link>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row md:space-x-12 text-center mb-4 md:mb-0">
          {/* Products Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Products</h4>
            <Link href="/courses" onClick={(e) => handleLinkClick(e, '/courses')} className="block text-gray-400 hover:text-gray-300">Courses</Link>
            <Link href="/job-board" onClick={(e) => handleLinkClick(e, '/courses')} className="block text-gray-400 hover:text-gray-300">Job Board</Link>
            <Link href="/coming-soon" onClick={(e) => handleLinkClick(e, '/courses')} className="block text-gray-400 hover:text-gray-300">VIP</Link>
            {/* <Link href="https://localhost:3001" onClick={(e) => handleLinkClick(e, '/courses')} className="block text-gray-400 hover:text-gray-300">Labs & Machines</Link> */}
          </div>
          

          {/* Company Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Company</h4>
            <Link href="/about-us" onClick={(e) => handleLinkClick(e, '/about-us')} className="block text-gray-400 hover:text-gray-300">About Us</Link>
            <Link href="/contact-us" onClick={(e) => handleLinkClick(e, '/contact-us')} className="block text-gray-400 hover:text-gray-300">Contact Us</Link>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Resources</h4>
            <Link href="/blog" onClick={(e) => handleLinkClick(e, '/blog')} className="block text-gray-400 hover:text-gray-300">Blog</Link>
            <Link href="/coming-soon" onClick={(e) => handleLinkClick(e, '/blog')} className="block text-gray-400 hover:text-gray-300">Career Opportunity</Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-gray-300">
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
