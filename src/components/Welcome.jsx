import PropTypes, { arrayOf } from "prop-types";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const slideIn = keyframes`
  from {
    opacity: 0%;
    transform: translateX(-24px);
  }

  to {
    opacity: 100%;
    transform: translateX(0px);
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(90deg, #aeb3b8, #929a68);
  opacity: 0%;
  display: flex;
  justify-content: center;
  padding: 24px;
  animation: ${slideIn} forwards 0.2s ease-in-out;

  & img {
    object-fit: cover;
  }

  & a {
    align-self: flex-end;
  }
`;

const CallToActionButton = styled.button`
  font-size: 1.6rem;
  padding: 12px;
  border-radius: 4px;
  align-self: flex-end;
  background-color: #4b5320;
  box-shadow: 0.2rem 0.2rem black, -0.2rem -0.2rem #ccc;
  transition: background-color 0.2s ease-in-out;

  animation: ${slideIn} backwards 0.1s ease-in-out 0.2s;

  &:hover {
    background-color: black;
    color: rgb(231, 239, 235);
  }
`;

function Welcome({ images }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeroSection>
          <article
            style={{
              background: "linear-gradient(270deg, #aeb3b8, #aeb3b8)",
              boxShadow: "0.2rem 0.2rem black, -0.2rem -0.2rem #ccc",
              width: "max(800px, 75%)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="welcomeIntroText">WELCOME TO THE BIONICLE STORE</h1>
            <blockquote className="welcomeQuote" cite="">
              <p>
                I am Mata Nui. My original form was built on the world of
                Spherus Magna more than one hundred thousand years ago. I was
                built to bring order back to my world and its people, but I lost
                my way. With the help of new and old friends, I have one final
                chance to fulfill my duty, and my destiny.
              </p>
              <footer>
                —Mata Nui, <cite>Mata Nui Saga</cite>
              </footer>
            </blockquote>
            <Link to="/shop/bionicles">
              <CallToActionButton>Check store</CallToActionButton>
            </Link>
          </article>
          <img src="https://static.wikia.nocookie.net/bionicle/images/7/7c/Voyanui.JPG" />
        </HeroSection>
      </div>

      {/* <img src={images[0].src} /> */}
    </>
  );
}

Welcome.propTypes = {
  images: arrayOf(PropTypes.shape({ src: PropTypes.string })),
};

export default Welcome;
