import "@fortawesome/fontawesome-free/css/all.css";

const Navbar = () => {
  return (
    <>
      <nav className="p-1 lg:p-3 py-5 lg:py-7 bg-white sticky top-0 z-50 shadow-sm">
        <a href="/">
          <div className="ml-3 lg:ml-36 flex items-center opacity-70 justify-center lg:justify-start md:justify-start">
            <i className="fab fa-whatsapp mr-2 lg:mr-4 text-3xl lg:text-3xl "></i>
            <span className="font-mono font-bold text-sm lg:text-xl tracking-wider">
              WasapClick!
            </span>
          </div>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
