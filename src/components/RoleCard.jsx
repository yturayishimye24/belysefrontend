import { ArrowRight } from "lucide-react";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";


export default function RoleCard({ image, title }) {
  return (
    <ScrollLinkedItem className="group relative w-[500px] h-[600px] overflow-hidden rounded-[24px] bg-white">
      {/* Image */}
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />

      {/* Sliding card */}
      <div
        className="
          absolute
          left-0
          top-[250px]
          h-full
          w-full
          rounded-[24px]
          bg-[#F2E7BE]
          transition-transform
          duration-700
          ease-in-out
          group-hover:-translate-y-[250px]
        "
      >
        {/* Title */}
        <div className="p-6">
          <h2 className="text-[20px] text-[#1f1f1f]">
            {title}
          </h2>
        </div>

        {/* Learn More */}
        <div className="absolute bottom-0 right-0 h-[58px] w-[170px] rounded-tl-[28px] bg-white">
          {/* Left curve */}
          <div className="absolute left-[-24px] bottom-0 h-[24px] w-[24px] rounded-full shadow-[12px_12px_0_0_white]" />

          {/* Top curve */}
          <div className="absolute right-0 top-[-24px] h-[24px] w-[24px] rounded-full shadow-[12px_12px_0_0_white]" />

          <button className="absolute bottom-[10px] right-[10px] flex h-[42px] w-[140px] items-center justify-center gap-3 rounded-full bg-[#A15D00] text-white font-medium">
            Learn more
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </ScrollLinkedItem>
  );
}