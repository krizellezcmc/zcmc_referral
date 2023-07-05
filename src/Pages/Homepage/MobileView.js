import React from "react";
import MobileBanner from "../../Components/Home/Mobile/MobileBanner";
import { Container } from "@chakra-ui/react";
import Gallery from "../../Components/Home/Gallery";
import Specialization from "../../Components/Home/Specialization";
import MobileAbout from "../../Components/Home/Mobile/MobileAbout";
import MobilePartners from "../../Components/Home/Mobile/MobilePartners";
import FAQs from "../../Components/Home/FAQs";
import MobileNavbar from "../../Components/Home/Mobile/MobileNavbar";

function MobileView(props) {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <MobileNavbar handleSelectionClick={scrollToSection} />
      <Container maxW="container.md" pt={10}>
        <div id="home" />
        <MobileBanner />

        <div id="gallery" />
        <Gallery />

        <div id="specialization" />
        <Specialization />

        <div id="about" />
        <MobileAbout />
        <MobilePartners />

        <div id="faqs" />
        <FAQs />
      </Container>
    </>
  );
}

export default MobileView;
