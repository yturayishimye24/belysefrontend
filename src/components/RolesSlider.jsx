import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import RoleCard from "./RoleCard";

export default function RolesSlider() {
  const roles = [
    { title: "AI and ML roles", image: "../../src/assets/images/BlueCench.png" },
    { title: "Software Engineering", image: "../../src/assets/images/BrownCench.jpeg" },
    { title: "Data Science", image: "../../src/assets/images/Cench.jpeg" },
    { title: "Cyber Security", image: "../../src/assets/images/Chelsea.webp" },
    { title: "Cloud Computing", image: "../../src/assets/images/centralCee.png" },
    { title: "Youtuber", image: "../../src/assets/images/centralCee.png" },
  ];

  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 2,
        scale: 0.85,
        slideShadows: false,
      }}
      className="py-16"
    >
      {roles.map((role, index) => (
        <SwiperSlide key={index} className="!w-[500px]">
          <RoleCard title={role.title} image={role.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}