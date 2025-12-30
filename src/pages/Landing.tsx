import React from "react";
import OurService from "./Landing/OurService";
import Hero from "./Landing/Hero";
import RoommateFinder from "./Landing/RoommateFinder";
import Featured from "./Landing/Featured";
import WhyUs from "./Landing/WhyUs";

const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <OurService />
      <RoommateFinder/>
      <Featured/>
      <WhyUs/>
    </>
  );
};

export default Landing;
