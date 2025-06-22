import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="container mx-auto text-center space-y-2">
        <p className="text-sm">
          © {currentYear} DrukYul Techies. All rights reserved.
        </p>
        <p className="text-xs">Thimphu, Bhutan</p>
        <p className="text-xs">
          <a
            href="https://www.youtube.com/@DrukyulTechies-r2d"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            YouTube Channel
          </a>
        </p>
        <p className="text-xs mt-2">Built using React and Tailwind CSS</p>
      </div>
    </footer>
  );
}
