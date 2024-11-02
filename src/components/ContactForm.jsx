const ContactForm = () => {
  return (
    <form className="">
      <h2 className="main-heading">Contact</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 p-2 block w-full border rounded-md outline-none"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 block w-full border rounded-md outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          className="mt-1 p-2 block w-full border rounded-md outline-none"
          placeholder="Your message"
        />
      </div>
      <button
        type="submit"
        className="w-fit py-2 px-4 bg-yellow-300 font-semibold text-black rounded-lg transition-colors duration-300 hover:bg-yellow-400"
      >
        SEND MESSAGE
      </button>
    </form>
  );
};

export default ContactForm;
