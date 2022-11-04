import React from "react";
import Header from "../../Components/Home/Header";
import Navbar from "../../Components/Home/Navbar";
import Copyright from "../../Components/Home/Copyright";
import Specialization from "../../Components/Home/Specialization";
import About from "../../Components/Home/About";
import FAQs from "../../Components/Home/FAQs";

function Home(props) {
  return (
    <>
      <Navbar />
      <div className="content">
        <Header />
        <Specialization />
        <About />
        <FAQs />
      </div>

      <div className="copyright">
        <Copyright />
      </div>
    </>
  );
}

export default Home;
