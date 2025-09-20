import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-30 bg-black text-white shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.3)] transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 max-w-6xl mx-auto">
    
        <div className="mb-2 md:mb-0 text-sm">
          &copy; {new Date().getFullYear()} Nour Elshorafa. All rights reserved.
        </div>

      
        <div className="flex items-center space-x-4">
          <a href="https://www.linkedin.com/in/nour-elshorafa-374b29221" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/nourElshorfa" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="mailto:nourelshorafa20@gmail.com" className="hover:text-amber-400 transition-colors">
            <FaEnvelope size={20} />
          </a>
          <a href="tel:01014665575" className="hover:text-amber-400 transition-colors">
            <FaPhone size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
