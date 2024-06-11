import { Link } from "@remix-run/react";
import { SearchInputProps } from "~/root";

const Footer: React.FC<SearchInputProps> = ({
  mobileSearchInput,
  desktopSearchInput,
  drawerMenu,
}) => {
  function handleSearchClick() {
    // if click search and screen width less than 900px, focus on mobileSearchInput
    if (window.innerWidth < 1024) {
      drawerMenu.current?.click();
      mobileSearchInput.current?.focus();
    } else {
      desktopSearchInput.current?.focus();
    }
  }
  return (
    <footer className="footer p-10 mt-10 bg-base-200 text-base-content">
      <aside>
        <img
          className="logo"
          src="./img/footer-logo.png"
          alt="Cycle TO Fun logo"
        />
      </aside>
      <nav>
        <h6 className="footer-title">Links</h6>
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link
          to="/search"
          className="link link-hover"
          onClick={handleSearchClick}
        >
          Search
        </Link>
        <Link to="/random" className="link link-hover">
          Random Ride
        </Link>
        <Link to="/about" className="link link-hover">
          About
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Contact</h6>
        <a href="https://stephensavoia.github.io/" className="link link-hover">
          My Portfolio
        </a>
        <a href="https://github.com/stephensavoia" className="link link-hover">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/stephensavoia/"
          className="link link-hover"
        >
          LinkedIn
        </a>
        <a href="mailto:cycletofun@gmail.com" className="link link-hover">
          Email
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/terms-of-use" className="link link-hover">
          Terms of use
        </Link>
        <Link to="/privacy-policy" className="link link-hover">
          Privacy policy
        </Link>
        <Link to="/cookie-policy" className="link link-hover">
          Cookie policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
