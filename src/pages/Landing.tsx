import React from "react";
import OurService from "./Landing/OurService";
import Hero from "./Landing/Hero";
import RoommateFinder from "./Landing/RoommateFinder";

const Landing: React.FC = () => {
  return (
    <>
      <Hero />
      <OurService />
      <RoommateFinder/>
    </>
  );
};

export default Landing;
