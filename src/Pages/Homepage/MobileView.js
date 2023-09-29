import React from "react";
import MobileBanner from "../../Components/Home/Mobile/MobileBanner";
import { Container } from "@chakra-ui/react";
import Gallery from "../../Components/Home/Gallery";
import Specialization from "../../Components/Home/Specialization";
import MobileAbout from "../../Components/Home/Mobile/MobileAbout";
import MobilePartners from "../../Components/Home/Mobile/MobilePartners";
import FAQs from "../../Components/Home/FAQs";
import MobileNavbar from "../../Components/Home/Mobile/MobileNavbar";
import Team from "../../Components/Home/Team";
import MobileCopyright from "../../Components/Home/Mobile/MobileCopyright";
import "../../Styles/Navbar.css";

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
        <section id="header" />
        <MobileBanner />
        <Gallery />

        <section id="about" />
        <MobileAbout />

        <section id="facilities" />
        <MobilePartners />

        <section id="services" />
        <Specialization />

        {/* <section id="team" />
        <Team /> */}

        <section id="faqs" />
        <FAQs />

        <div className="copyright">
          <MobileCopyright />
        </div>
      </Container>
    </>
  );
}

export default MobileView;
