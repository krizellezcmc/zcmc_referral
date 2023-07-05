import React from "react";
import MobileBanner from "../../Components/Home/Mobile/MobileBanner";
import { Container } from "@chakra-ui/react";
import Gallery from "../../Components/Home/Gallery";
import Specialization from "../../Components/Home/Specialization";
import MobileAbout from "../../Components/Home/Mobile/MobileAbout";
import Partners from "../../Components/Home/Partners";
import MobilePartners from "../../Components/Home/Mobile/MobilePartners";
import FAQs from "../../Components/Home/FAQs";
import MobileNavbar from "../../Components/Home/Mobile/MobileNavbarOld";

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
        <div id="home">
          <MobileBanner />
        </div>

        <div id="gallery">
          <Gallery />
        </div>

        <div id="specialization">
          <Specialization />
        </div>

        <div id="about">
          <MobileAbout />
          <MobilePartners />
        </div>

        <div id="faqs">
          <FAQs />
        </div>
      </Container>
    </>
  );
}

export default MobileView;
