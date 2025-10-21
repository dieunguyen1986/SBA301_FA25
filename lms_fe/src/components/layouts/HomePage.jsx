// src/components/layouts/HomePage.js
import React from 'react';
import HeroSection from '../layouts/HeroSection';
import Adverisment from '../layouts/Advertisment';
import Focus from '../layouts/Focus';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Adverisment />
      <Focus />
    </>
  );
};

export default HomePage;