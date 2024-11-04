const ContactForm = () => {
  return (
    <form className="">
      <h2 className="main-heading">Contact</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows="3"
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-fit py-2 px-4 bg-yellow-300 font-semibold text-black rounded-lg transition-colors duration-300 hover:bg-yellow-400"
      >
        SEND MESSAGE
      </button>
    </form>
  );
};

export default ContactForm;
