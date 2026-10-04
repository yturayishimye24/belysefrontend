import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function NewFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#6d28d9] px-5 py-12 font-poppins text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="#home" className="text-2xl font-bold">
          Belyse<span className="text-yellow-400">.</span>
        </a>
        <p className="text-sm text-purple-200">© 2026 Belyse Abayisenga. All rights reserved.</p>
        <div className="flex gap-5 text-2xl">
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-yellow-400"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-yellow-400"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
}