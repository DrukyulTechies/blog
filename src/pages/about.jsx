import NavBar from "../components/navBar";
import { AtSign } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1e2939] flex items-center justify-center px-4">
        <div className="bg-white max-w-3xl rounded-xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://picsum.photos/600/400?random=2"
            alt="About Us"
            className="w-full md:w-1/2 rounded-xl object-cover shadow-md"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
              About Us
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We are dedicated to providing accessible and engaging learning
              experiences for everyone. Our mission is to empower individuals
              through knowledge and skills. Join us on this journey to unlock
              your potential and grow together.
            </p>

            <div className="flex items-center justify-center md:justify-start text-gray-600 mt-4">
              <AtSign className="w-5 h-5 mr-2" />
              <span className="text-sm">drukyultechies@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
