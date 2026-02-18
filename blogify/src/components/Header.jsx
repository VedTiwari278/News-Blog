// components/Header.js
"use client"; // for useState
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-black font-[cursive] text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold">
          Blogify
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {/* <Link href="/" className="hover:text-gray-300">
            Home
          </Link> */}
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/blog" className="hover:text-gray-300">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-black px-4 py-4 space-y-2">
          {/* <Link
            href="/"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link> */}
          <Link
            href="/about"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/blog"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
