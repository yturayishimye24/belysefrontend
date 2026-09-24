import Image1 from "../../src/assets/images/best6.jpg";
import Image2 from "../../src/assets/images/best1.jpg";
import Image4 from "../../src/assets/images/best4.jpg";

const CardStack = ({ cards }) => {
  // Fallback default cards if no data is passed as props
  const defaultCards = [
    {
      id: 1,
        title: 'Student Mastery',
        image: Image1,
      alt: 'Student Mastery Card',
    },
    {
      id: 2,
      title: 'Interactive Practice',
      image: Image2,
      alt: 'Interactive Practice Card',
    },
    {
      id: 3,
      title: 'Guided Composition',
      image: Image4,
      alt: 'Guided Composition Card',
    },
  ];

  const items = cards || defaultCards;

  return (
    <div className="relative flex min-h-[360px] w-full items-center justify-center overflow-visible py-0 max-[600px]:min-h-[300px]">
      
      {/* Left Card */}
      <div 
        data-aos="fade-down-right"
        className="
          absolute h-[360px] w-[min(70vw,320px)] overflow-hidden rounded-2xl max-[640px]:h-[400px]
          transition-transform duration-500 ease-out cursor-pointer z-10
          -translate-x-28 scale-90 -rotate-6
          hover:z-30 hover:-translate-x-44 hover:scale-100 hover:rotate-0
        "
      >
        <img 
          src={items[0]?.image} 
          alt={items[0]?.alt || 'Left card'} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out" 
        />
      </div>

      {/* Middle Card (Front & Center) */}
      <div 
        data-aos="zoom-in-down"
        className="
          relative h-[360px] w-[min(70vw,320px)] overflow-hidden rounded-2xl max-[640px]:h-[300px]
          transition-transform duration-500 ease-out cursor-pointer z-20
          scale-100 rotate-0
          hover:z-30 hover:scale-105
        "
      >
        <img 
          src={items[1]?.image} 
          alt={items[1]?.alt || 'Middle card'} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out" 
        />
      </div>

      
      <div 
        data-aos="fade-down-left"
        className="
          absolute h-[360px] w-[min(70vw,320px)] overflow-hidden rounded-2xl max-[640px]:h-[300px]
          transition-transform duration-500 ease-out cursor-pointer z-10
          translate-x-28 scale-90 rotate-6
          hover:z-30 hover:translate-x-44 hover:scale-100 hover:rotate-0
        "
      >
        <img 
          src={items[2]?.image} 
          alt={items[2]?.alt || 'Right card'} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out" 
        />
      </div>

    </div>
  );
};

export default CardStack;