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
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/94715109259"
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="flex items-center gap-1.5 py-2 px-3 text-white font-semibold bg-[#25D366] hover:bg-[#128c7e] rounded-lg transition-colors duration-200">
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </button>
            </a>
            {/* <a
              href="#"
              className="text-primary dark:text-soft-gray hover:text-indigo-600 hover:scale-110 transition-all duration-200"
            >
              <i className="fab fa-facebook-f "></i>
            </a>
            <a
              href="#"
              className="text-primary dark:text-soft-gray hover:text-indigo-600 hover:scale-110 transition-all duration-200"
            >
              <i className="fab fa-twitter"></i>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
