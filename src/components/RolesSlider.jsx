import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import RoleCard from "./RoleCard";
import BlueCench from "../assets/images/BlueCench.png";
import BrownCench from "../assets/images/BrownCench.jpeg";
import Cench from "../assets/images/Cench.jpeg";
import Chelsea from "../assets/images/Chelsea.webp";
import centralCee from "../assets/images/centralCee.png";

export default function RolesSlider() {
  const roles = [
    { title: "AI and ML roles", image: BlueCench },
    { title: "Software Engineering", image: BrownCench },
    { title: "Data Science", image: Cench },
    { title: "Cyber Security", image: Chelsea },
    { title: "Cloud Computing", image: centralCee },
    { title: "Youtuber", image: centralCee },
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
        <SwiperSlide key={index} className="w-125!">
          <RoleCard title={role.title} image={role.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}