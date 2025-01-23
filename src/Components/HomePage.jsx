import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "./Banner";
import Footer from "./Layouts/Footer";
import PostListPage from "./PostListPage";
import {Link} from 'react-router-dom'

function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container-fluid">
      {/* Banner Section */}
      <Banner />

      {/* What is Blogging Section */}
      <section className="my-5" data-aos="fade-up">
  <div className="container">
    <h2 className="text-center mb-4 text-primary">What is Blogging?</h2>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm border-0 rounded-3 p-4">
          <div className="card-body">
            <p style={{textAlign: 'justify'}} className="lead text-muted">
              Blogging is a form of writing that allows individuals and businesses
              to share their thoughts, ideas, experiences, and knowledge with an
              audience. Blogs can range from personal journals to industry insights
              and tutorials.
            </p>
            <div className="mt-4 text-center">
              <Link to='/login'><button className="btn btn-outline-primary btn-lg">Start Blogging</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Recent Blog Posts Section */}
      <section className="my-5" data-aos="fade-up">
  <h3 className="text-center mb-4">Recent Posts</h3>
  <div style={{marginTop: '-80px'}} className="row">
    <PostListPage />
  </div>
</section>
<Footer />
    </div>
  );
}

export default HomePage;
