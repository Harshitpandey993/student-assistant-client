import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUsScreen = () => {
  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="ms-5 mt-2">
        <Link to="/" className="button-6" >
          <FaHome /> Back To Home
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 item">
            <div className="item-in">
              <h4>Who are We?</h4>
              <div className="seperator"></div>
              <p>
                Actually We are not any professionals. This website has been
                created for the purpose of aiding students for buying and
                selling the notes and other items that they no longer need which
                might be useful for other new students. We take no charge for
                this. What we do is just aid in establishing the communication
                between buyer and seller.These can include: notes, drawing
                instruments, utensils & furnitures specially by students who are
                on the verge of leaving campus sooner or later.
              </p>
            </div>
          </div>
          <div className="col-md-6 item">
            <div className="item-in">
              <h4>Developer</h4>
              <div className="seperator"></div>
              <h4>Designed and developed by Harshit Pandey </h4>
            </div>
          </div>
          <div className="col-md-6 item">
            <div className="item-in">
              <h4>Contact Details</h4>
              <div className="seperator"></div>
              <i className="fas fa-phone"></i> 8287253559
              <br />
              <i className="fas fa-envelope-square"></i>{" "}
              <a target="_blank" href={`mailto:mannasourav111@gmail.com`}>
                pandeyharshit40@gmail.com
              </a>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsScreen;
