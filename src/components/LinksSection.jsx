import { emblem } from "@/assets";
import { Link } from "react-router-dom";

const Card = ({ image, text, link }) => {
  return (
    <>
      <Link to={link}>
        <div className="flex items-center justify-start gap-7 bg-red-900 rounded-lg overflow-hidden p-4 transition-transform duration-200 cursor-pointer card hover:translate-y-[-5px]">
          <div className="w-8 flex-shrink-0">
            <img src={image} alt={text} className="w-full h-full object-fill" />
          </div>
          <p className="text-base text-white font-semibold">{text}</p>
        </div>
      </Link>
    </>
  );
};

const LinksSection = () => {
  const cardData = [
    {
      image: emblem,
      text: "Ministry of Power and Energy",
      link: "https://www.powermin.gov.lk",
    },
    {
      image: emblem,
      text: "Lanka Electricity Company Pvt Ltd",
      link: "https://www.leco.lk",
    },
    {
      image: emblem,
      text: "LTL Holdings",
      link: "https://www.ltl.lk",
    },
  ];

  return (
    <div className="bg-white py-12 flex items-center justify-center">
      <div className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              text={card.text}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksSection;
