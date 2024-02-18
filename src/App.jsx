import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./assets/list.css";
import styled from "styled-components";

const NavbarElementsList = styled.ul`
  font-size: 2rem;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const Navbar = styled.nav`
  background-color: #4b5320;
  padding: "12px";

  & a {
    color: #0504aa;
    text-decoration: none;
  }

  & a:hover {
    color: rgb(231, 239, 235);
  }
`;

const TitleText = styled.h1`
  color: #0504aa;
  position: relative;

  &::before {
    content: "";
    display: inline-block;
    position: abolute;
    width: 2px;
    height: 32px;
    background-color: rgb(231, 239, 235);
    transition: transform 0.2s ease-in-out;
  }

  &:hover&::before {
    transform: translateX(420px);
  }
`;

const ShopSubMenu = styled.ul`
  display: none;
  position: absolute;
  z-index: 2;
  background-color: #4b5320;

  list-style: none;

  & a {
    color: #0504aa;
    text-decoration: none;
  }

  & a:hover {
    color: rgb(231, 239, 235);
  }
`;

const DropdownLink = styled.ul`
  text-decoration: none;
  position: relative;
  color: #0504aa;

  &:hover {
    color: rgb(231, 239, 235);
  }

  &:hover ${ShopSubMenu} {
    display: block;
  }
`;

function App({ images }) {
  const handleClick = async () => {
    const response = await fetch(
      "http://127.0.0.1:3000/articles/6/comments/4",
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Navbar>
        <NavbarElementsList>
          <li
            style={{
              marginRight: "auto",
              fontWeight: "900",
            }}
          >
            <TitleText>BIONICLE STORE</TitleText>
          </li>
          <li>
            <DropdownLink to="shop">
              SHOP
              <ShopSubMenu>
                <li>
                  <Link to="shop/bionicles">Bionicles</Link>
                </li>
                <li>
                  <Link to="shop/extras">Extras</Link>
                </li>
              </ShopSubMenu>
            </DropdownLink>
            {/* <ul className="shopSubMenu">
              <li>
                <a onClick={handleClick}>Bionicles</a>
              </li>
              <li>
                <a>Extras</a>
              </li>
            </ul> */}
          </li>
          <li>
            <Link to="/">HOME</Link>
          </li>
        </NavbarElementsList>
      </Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
