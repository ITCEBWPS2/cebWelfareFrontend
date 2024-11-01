import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { annual_meeting, blood_donation } from "@/assets";

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
          <h3 className="font-header text-2xl font-bold mb-3">{title}</h3>
          <p className="text-sm text-justify text-secondary">
            {truncatedDescription}
          </p>
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
            <h3 className="font-header text-2xl font-bold">{title}</h3>
            <p className="text-sm text-justify">{description}</p>
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
    {
      image: annual_meeting,
      title: "Development of environmental libraries",
      description:
        "The NEIC is actively involved in the development of school libraries. It has established 36 environmental libraries across all districts island-wide. Additionally, a program is underway to create environmental libraries for all provincial and district offices of the CEA, with libraries already established in Kandy, Galle, Kilinochchi, Gampaha, and Ampara. These efforts aim to enhance access to environmental information and resources for students and professionals alike. By fostering educational opportunities and promoting environmental awareness, NEIC's initiatives play a crucial role in building a more informed and environmentally conscious society. These libraries are essential resources for nurturing a sustainable future.",
    },
    {
      image: annual_meeting,
      title: "Providing EIA/IEE Report purchase news",
      description:
        "The NEIC collects and maintains Environmental Impact Assessment (EIA) and Initial Environmental Examination (IEE) reports for its users, including those in construction, research, and consulting fields. These reports are essential for meeting various informational needs. The NEIC also offers a digitized EIA and IEE collection through the CEA E-Repository(http://cea.nsf.ac.lk/), accessible to everyone via online searches. Additionally, users can obtain this EIA and IEE reports as soft copies through online payment, and the NEIC provides facilities for purchasing these reports. By offering comprehensive access and purchasing options, the NEIC ensures that vital environmental information is readily available to support informed decision-making and research.",
    },
    {
      image: annual_meeting,
      title: "Photocopy service",
      description:
        "The NEIC offers photocopying and scanning facilities to its users, aiding them in making notes and collecting information for their studies. These news are invaluable for students and researchers who need to access and reproduce important documents. Additionally, CEA customers can utilize the library’s photocopying news after paying the applicable charges. For distance learners, NEIC provides scanning news via email and WhatsApp, ensuring that even remote users have access to necessary materials. By offering these comprehensive and convenient news, the NEIC supports users in effectively gathering and managing information crucial for their academic and professional pursuits.",
    },
  ];
  return (
    <div id="news" className="py-7 md:py-14">
      <h1 className="font-header font-bold text-center mb-12 text-4xl md:text-6xl md:text-left">
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
    </div>
  );
};

export default NewsSection;
