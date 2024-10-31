import React from 'react';
import '../App.css';

function Footer() {
  return (
    <div className="container-fluid mt-4">
      <footer className="footer align-items-center border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"></svg>
          </a>
          <span className="mb-3 mb-md-0 text-muted">© {new Date().getFullYear()} Tech Titans</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#/"><svg className="bi" width="24" height="24"></svg></a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#/"><svg className="bi" width="24" height="24"></svg></a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#/"><svg className="bi" width="24" height="24"></svg></a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
