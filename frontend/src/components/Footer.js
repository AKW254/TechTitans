import React from 'react';


function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center text-white border-top bg-dark py-2 px-3 mt-auto">
      <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 text-body-secondary">
          © {new Date().getFullYear()} Tech Titans Blog
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li>
          <a href="/" className="text-body-secondary px-2 text-white">
            Home
          </a>
        </li>
        <li>
          <a href="/" className="text-body-secondary px-2 text-white">
            About Us
          </a>
        </li>
        <li>
          <a href="/" className="text-body-secondary px-2 text-white">
            Contact US
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
