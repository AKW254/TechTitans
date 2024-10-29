import React from 'react';
import '../App.css';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Tech Titans</a> {/* Updated href to a valid route */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
     
      <div className="d-flex ms-auto">
        <button className="button btn btn-outline-danger me-2">Login</button>
      </div>

    </div>
  </div>
</nav>
  )
}

export default Header