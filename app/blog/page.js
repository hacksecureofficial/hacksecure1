'use client'

import Navbar from './navbar'
import Footer from './footer'

import Link from 'next/link'

export default function BlogPage() {
  const blogs = [
    {
      title: "How to Learn Cybersecurity",
      image: "/blog-image1.jpg",
      description: "A beginner's guide to understanding and learning cybersecurity concepts. Start your journey into the world of hacking and security.",
      link: "/blog/how-to-learn-cybersecurity"
    },
    {
      title: "Understanding Ethical Hacking",
      image: "/blog-image2.jpg",
      description: "Ethical hacking is an essential skill for any security professional. Learn the basics and get started with ethical hacking techniques.",
      link: "/blog/understanding-ethical-hacking"
    },
    {
      title: "Top Tools for Penetration Testing",
      image: "/blog-image3.jpg",
      description: "Penetration testing tools are crucial in identifying and fixing security vulnerabilities. Explore the top tools every pen tester should know.",
      link: "/blog/top-tools-for-penetration-testing"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Latest Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-400 mb-4">{blog.description}</p>
              <Link href={blog.link}>
                <button className="bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300">
                  Read Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
