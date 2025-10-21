import React from "react";
import { Container } from "react-bootstrap";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h5 className="fw-bold mb-3 mb-md-0">AI Website Builder</h5>
        
        <div className="d-flex gap-3 mb-3 mb-md-0">
          <a href="https://facebook.com" className="text-light"><BsFacebook size={20} /></a>
          <a href="https://twitter.com" className="text-light"><BsTwitter size={20} /></a>
          <a href="https://linkedin.com" className="text-light"><BsLinkedin size={20} /></a>
        </div>
        
        <small className="text-muted">
          © {new Date().getFullYear()} All rights reserved.
        </small>
      </Container>
    </footer>
  );
}

export default Footer;
