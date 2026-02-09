"use clinent";
import BeforeAfter from "./homeSection/BeforeAfter";
import Hero from "./homeSection/heroPage/Hero";
import Reviews from "./homeSection/Reviews";
import WhyDentaris from "./homeSection/WhyDentaris";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <WhyDentaris />
      <Reviews />
      <BeforeAfter />
    </div>
  );
};
