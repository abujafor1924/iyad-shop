import { FaItalic } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <a className="text-3xl font-bold font-heading" href="#">
            <span className="flex">
              <FaItalic className="-mr-1 mt-1 text-rose-800" />
              YADSHOP
            </span>
            <p className="text-xl font-normal  text-slate-500">
              Ecommerce Website
            </p>
          </a>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <div className="py-4 bg-slate-200">
        <h1 className="text-center font-normal">
          Abu jafor : all rights reserved
        </h1>
      </div>
    </>
  );
};

export default Footer;
