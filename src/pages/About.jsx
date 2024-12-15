import { annual_meeting } from "@/assets";
import SubHeader from "@/components/SubHeader";
import React from "react";

const About = () => {
  const image = annual_meeting,
    title = "About Us",
    description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius";
  return (
    <>
      <SubHeader image={image} title={title} description={description} />
    </>
  );
};

export default About;
