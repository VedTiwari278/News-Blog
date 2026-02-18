// components/Footer.js
import React from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border  border-b-blue-700 text-gray-300 font-[cursive] py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
        {/* Branding */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-white">Blogify</h2>
          <p className="mt-2 text-sm">Sharing knowledge.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-white mb-2">Follow Me</h3>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition rounded-full bg-black p-2 flex items-center justify-center"
            >
              <FaTwitter size={24} color="#1DA1F2" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition rounded-full bg-black p-2 flex items-center justify-center"
            >
              <FaFacebook size={24} color="#1877F2" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition rounded-full bg-black p-2 flex items-center justify-center"
            >
              <FaLinkedin size={24} color="#0A66C2" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition rounded-full bg-black p-2 flex items-center justify-center"
            >
              <FaGithub size={24} color="white" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition rounded-full bg-black p-2 flex items-center justify-center"
            >
              <FaYoutube size={24} color="#FF0000" />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © 2026 Blogify. All rights reserved.
      </p>
    </footer>
  );
}
