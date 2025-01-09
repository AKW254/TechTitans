import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Single_post() {
  return (
    <>
      <Header />
      <section class="section blog-wrap bg-gray">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8">
              <div class="row">
                <div class="col-lg-12 mb-5">
                  <div class="single-blog-item">
                    <img
                      src="images/blog/2.jpg"
                      alt=""
                      class="img-fluid rounded"
                    />
                    <div class="blog-item-content bg-white p-5">
                      <h2 class="mt-3 mb-4">
                        
                          Improve design with typography?
                       
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Possimus natus, consectetur? Illum libero vel
                        nihil nisi quae, voluptatem, sapiente necessitatibus
                        distinctio voluptates, iusto qui. Laboriosam autem, nam
                        voluptate in beatae.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="sidebar-wrap">
                <div class="sidebar-widget card border-0 mb-3">
                  <img
                    src="images/blog/blog-author.jpg"
                    alt=""
                    class="img-fluid"
                  />
                  <div class="card-body p-4 text-center">
                    <h5 class="mb-0 mt-4">Arther Conal</h5>
					<p class="text-muted mb-0">Blog Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Single_post;
