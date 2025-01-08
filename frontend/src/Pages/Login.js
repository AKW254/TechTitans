import React from 'react'

function Login() {
  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100">
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <img
              src="images/Computer login-rafiki.svg" // Replace with your illustration/image URL
              alt="Illustration"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-md-8 col-12 d-flex align-items-center justify-content-center">
            <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
              <div className="card-body">
                <h3 className="text-center mb-3">Sign In</h3>
                <p className="text-muted text-center mb-4">
                  Welcome back! Please sign in to your account.
                </p>
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-small btn-main btn-round-full">
                      Log In
                    </button>
                  </div>
                  <div className="text-center text-muted mb-3">
                    <a href="/register" className="text-decoration-none">
                      Don't have an account?
                    </a>
                  </div>
                </form>
                <div className="text-center mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login