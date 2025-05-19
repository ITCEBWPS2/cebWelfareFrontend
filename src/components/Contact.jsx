import ContactForm from "./ContactForm";
import { blood_donation } from "@/assets";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Contact = () => {
  return (
    <section id="contact" className="pt-14 pb-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-2/5 lg:pr-16 mb-8 lg:mb-0">
          <ContactForm />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={blood_donation}
            alt="Contact Us"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit
            amet nisl non urna fringilla cursus vitae nec metus. Suspendisse
            malesuada sodales varius. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus
            vitae nec metus. Suspendisse malesuada sodales varius.
          </p>
          {/* <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/94715109259"
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="flex items-center gap-1.5 py-2 px-3 text-white font-bold bg-[#25D366] hover:bg-[#128c7e] rounded-lg transition-colors duration-200">
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </button>
            </a>

            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/your-profile-or-page"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-1.5 py-2 px-3 text-white font-bold bg-[#1877F2] hover:bg-[#166fe5] rounded-lg transition-colors duration-200"
              >
                <i className="fab fa-facebook-f"></i>
                Facebook
              </a>

              <a
                href="https://twitter.com/your-profile"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-1.5 py-2 px-3 text-white font-bold bg-[#1DA1F2] hover:bg-[#0d8de6] rounded-lg transition-colors duration-200"
              >
                <i className="fab fa-twitter"></i>
                Twitter
              </a>

              <a
                href="https://www.instagram.com/your-profile"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-1.5 py-2 px-3 text-white font-bold bg-[#E4405F] hover:bg-[#d82f54] rounded-lg transition-colors duration-200"
              >
                <i className="fab fa-instagram"></i>
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/in/your-profile"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-1.5 py-2 px-3 text-white font-bold bg-[#0077B5] hover:bg-[#005582] rounded-lg transition-colors duration-200"
              >
                <i className="fab fa-linkedin-in"></i>
                LinkedIn
              </a>
            </div>
          </div> */}

        </div>
      </div>
      {/* Company Location Section with Embedded Map */}
      <div className="mt-8 text-center">
        <h3 className="text-[36px] font-bold mb-[24px]">Our Location</h3>
        <div className="flex justify-center">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9001011872024!2d79.90558817599401!3d6.902549118640395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259f9d61759c9%3A0x14ae61adecb890d8!2sCeylon%20Electricity%20Board%2C%20Distribution%20Division%2003%20-%20Headquarters!5e0!3m2!1sen!2slk!4v1742355447413!5m2!1sen!2slk"
            width="100%"
            height="450"
            style={{ border: "1px solid black" }} 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </section>
  );
};

export default Contact;
