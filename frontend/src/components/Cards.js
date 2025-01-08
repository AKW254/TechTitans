import React from 'react';



function Cards() {
  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/1.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2">
                 
                </div>

                <h3 className="mt-3 mb-3">
                  <a href="blog-single.html">Improve design with typography?</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <a
                  href="blog-single.html"
                  className="btn btn-small btn-main btn-round-full"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/2.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2">
                  
                </div>

                <h3 className="mt-3 mb-3">
                  <a href="blog-single.html">Interactivity connect consumer</a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <a
                  href="blog-single.html"
                  className="btn btn-small btn-main btn-round-full"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/3.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2">
                  
                </div>

                <h3 className="mt-3 mb-3">
                  <a href="blog-single.html">
                    Marketing Strategy to bring more affect
                  </a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <a
                  href="blog-single.html"
                  className="btn btn-small btn-main btn-round-full"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-5">
            <div className="blog-item">
              <img
                src="images/blog/4.jpg"
                alt=""
                className="img-fluid rounded"
              />

              <div className="blog-item-content bg-white p-5">
                <div className="blog-item-meta bg-gray py-1 px-2">
            
                </div>

                <h3 className="mt-3 mb-3">
                  <a href="blog-single.html">
                    Marketing Strategy to bring more affect
                  </a>
                </h3>
                <p className="mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>

                <a
                  href="blog-single.html"
                  className="btn btn-small btn-main btn-round-full"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-6 text-center">
            <nav className="navigation pagination d-inline-block">
              <div className="nav-links">
                <a className="prev page-numbers" href="/#">
                  Prev
                </a>
                <span aria-current="page" className="page-numbers current">
                  1
                </span>
                <a className="page-numbers" href="/#">
                  2
                </a>
                <a class="next page-numbers" href="/">
                  Next
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;