import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { navItems } from "./navItems";

type Props = {
  menuItems?: { link: string | "login" | "signUp"; name: string }[];
};

interface IContainer {
  $height?: number;
}

const Container = styled.div<IContainer>`
  width: 100vw;
  height: ${(props) => props.$height}px;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-items {
    display: flex;
    justify-content: center;
    align-items: center;
    .menu-item {
      margin: 0 10px;
    }
  }
`;

const NavBar: FC<Props> = ({ menuItems = navItems }: Props) => {
  return (
    <Container $height={60}>
      <div className="nav-logo"></div>
      <div className="menu-items">
        {menuItems.map((item) => (
          <span className="menu-item">
            <Link href={item.link}>{item.name}</Link>
          </span>
        ))}
      </div>
    </Container>
  );
};

export default NavBar;
