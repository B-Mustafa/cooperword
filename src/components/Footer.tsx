import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="flex flex-wrap items-center w-full p-6 footer gap-7 grow justify-between"
      style={{ borderTop: "1px solid #ffffff20" }}
    >
      <div className="footer-section1 flex flex-col gap-2">
        <h3 className="text-[20px] font-semibold text-white">Cooper Word</h3>
        <p className="text-sm text-white opacity-75">
          Get started with our event management solution and start building your project.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-sm px-4 py-2 bg-white text-black rounded-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="footer-section2">
          <ul className="flex flex-col gap-2 text-sm list-none">
            <p className="font-bold">EXPLORE</p>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/" className="opacity-75 hover:opacity-100">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section3">
          <ul className="flex flex-col gap-2 text-sm list-none">
            <p className="font-bold">SUPPORT</p>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="opacity-75 hover:opacity-100"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
