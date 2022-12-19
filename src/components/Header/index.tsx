import { HeaderContainer } from "./styles";
import ReactLogo from "../../assets/react-logo.svg";
import { Scroll, Timer } from "phosphor-react";

export function Header() {
  return (
    <HeaderContainer>
      <img src={ReactLogo} />
      <nav>
        <a href="">
          <Timer size={24}/>
        </a>
        <a href="">
          <Scroll size={24}/>
        </a>
      </nav>
    </HeaderContainer>
  );
}
