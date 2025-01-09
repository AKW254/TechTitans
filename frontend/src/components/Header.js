import React from "react";


const Header = () => {


  return (
	
    <header className="navigation">
      <nav className="navbar  fixed-top navbar-expand-lg  py-4" id="navbar">
        <div className="container">
          <a className="navbar-brand" href="/#">
            Tech<span>Titans.</span>
          </a>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span>
          </button>

          <div
            className="collapse navbar-collapse text-center"
            id="navbarsExample09"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active float-right">
                <a className="nav-link" href="/#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active float-right">
                <a className="nav-link" href="/Create Post">
                  Create Post <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active float-right">
                <a className="nav-link" href="/#">
                  Manage Posts <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>

            <form className="form-lg-inline my-2 my-md-0 ml-lg-4 text-center">
              <a href="/login" className="btn btn-solid-border btn-round-full">
                Login
              </a>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
