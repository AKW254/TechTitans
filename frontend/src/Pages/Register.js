import React from 'react'

function Register() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
          <img
            src="/images/Sign up-rafiki.svg" // Replace with your illustration/image URL
            alt="Illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 col-md-8 col-12 d-flex align-items-center justify-content-center">
          <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <div className="card-body">
              <h3 className="text-center mb-3">Register</h3>
              <p className="text-muted text-center mb-4">
                Create your account to get started!
              </p>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value=""
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value=""
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-small btn-main btn-round-full"
                >
                  Register
                </button>
              </form>
              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-decoration-none">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register