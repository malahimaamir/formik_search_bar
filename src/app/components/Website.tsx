"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800">
      <nav className="bg-white shadow fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">MyWebsite</div>
          <div className="space-x-6 hidden md:block">
            <a href="#home" className="hover:text-blue-500">
              Home
            </a>
            <a href="#about" className="hover:text-blue-500">
              About
            </a>
            <a href="#services" className="hover:text-blue-500">
              Services
            </a>
            <a href="#contact" className="hover:text-blue-500">
              Contact
            </a>
            <a href="/Admin" className="hover:text-blue-500">
              Admin
            </a>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="pt-28 pb-20 bg-gradient-to-br from-blue-100 to-blue-200 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          We build modern and responsive websites with love and logic.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      <section id="about" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          We are a team of developers passionate about creating beautiful and
          functional digital experiences.
        </p>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {["Web Design", "Development", "SEO Optimization"].map(
            (service, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p className="text-gray-600">
                  We provide top-notch {service.toLowerCase()} services tailored
                  to your needs.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section id="contact" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="bg-blue-600 text-white text-center py-4">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </footer>

      
    </div>
  );
};

export default HomePage;
