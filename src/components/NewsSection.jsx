import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { annual_meeting, blood_donation } from "@/assets";
import { Link } from "react-router-dom";

const NewsCard = ({ image, title, description }) => {
  const charLimit = 150;

  const shouldTruncate = description.length > charLimit;
  const truncatedDescription = shouldTruncate ? (
    <>
      {description.substring(0, charLimit)}
      <span className="text-teal">...</span>{" "}
    </>
  ) : (
    description
  );

  return (
    <div className="cursor-pointer rounded-2xl text-center">
      <Dialog>
        <DialogTrigger className="text-left">
          <div className="w-full h-48 mx-auto mb-3 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`${title}'s image`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 "
            />
          </div>
          <h3 className="font-heading text-2xl font-bold mb-3">{title}</h3>
          <p className="text-sm">{truncatedDescription}</p>
        </DialogTrigger>
        <DialogContent className="w-2xl max-w-2xl bg-white border-none">
          <div className="flex flex-col gap-5 text-left">
            <div className="w-full h-72 mx-auto">
              <img
                src={image}
                alt={`${title}'s image`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="font-heading text-2xl font-bold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const NewsSection = () => {
  const news = [
    {
      image: blood_donation,
      title: "The Blood Donation Camp",
      description:
        "The Blood Donation Camp was successfully completed on 31-10-2023 by the Welfare Association for the 54th Anniversary of Lang.VMA (B.P. II). Western Province South II Welfare Association 14th Annual The general meeting was held on 12-06-2024.",
    },
    {
      image: annual_meeting,
      title: "Reader news & facilities",
      description:
        "With the 24/7 news of the NEIC, our Online Public Access Catalogue (OPAC) is always available, allowing you to search and access our extensive collection of resources anytime, anywhere. Whether you're looking for books, journals, or digital media, our OPAC ensures you find what you need with ease. Additionally, our reading room facilities provide a quiet and comfortable environment, perfect for focused study or research. Equipped with all the necessary amenities, our reading rooms offer a pleasant and productive reading experience. Enjoy seamless access to our resources and a conducive atmosphere for all your academic needs.",
    },
    {
      image: annual_meeting,
      title: "Environmental Activities and news",
      description:
        "The NEIC is organizing various initiatives to disseminate environmental information and knowledge to local and overseas users. These include user awareness programs, exhibitions, reading month and literacy month programs, and storytelling sessions for children. Additionally, the NEIC provides numerous current awareness news. It has developed into a fully automated library, ensuring the dissemination and preservation of environmental information for future generations. By participating in these programs, users can enhance their understanding of environmental issues and contribute to global sustainability efforts. The NEIC’s commitment to education and automation makes it a vital resource for environmental knowledge.",
    },
  ];
  return (
    <div id="news" className="py-7 md:py-14">
      <h1 className="font-heading font-bold text-center mb-12 text-4xl md:text-6xl md:text-left">
        Latest Events
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-14">
        {news.map((news, index) => (
          <NewsCard
            key={index}
            image={news.image}
            title={news.title}
            description={news.description}
          />
        ))}
      </div>
      <Link to="/events">
        <button className="mt-4 font-semibold hover:text-red-900 transition-colors duration-200">
          View More Events...
        </button>
      </Link>
    </div>
  );
};

export default NewsSection;
