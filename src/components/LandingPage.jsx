import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container px-4 py-5">
      <div className="row align-items-center justify-content-center text-center py-4">
        <div className="col-12 col-md-6">
          <img
            src="images/g.jpg"
            alt="Fluffee Cake"
            className="img-fluid rounded-circle homepage-image"
            width="500"
            height="500"
            loading="lazy"
          />
        </div>

        <div className="intro col-12 col-md-6 text-lg-start">
          <h1 className="display-6 fw-bold mb-3 text-center text-md-start">
            Hey Sweet Creator, Welcome to Dessertify!
          </h1>
          <p className="lead text-md-start">
            Got a recipe you love? Add it! Want to try something new? Create it!
            Dessertify lets you collect, customize, and cherish all your dessert
            recipes in one fun and easy-to-use place.
          </p>
          <p className="lead text-md-start">
            Because every dessert deserves to be remembered — and shared! Tap
            "Let's Get Started" to begin!
          </p>

          <div className="d-flex justify-content-center justify-content-md-start">
            <Link to="/home" className="btn btn-click btn-lg fw-bold">
              Let's Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
