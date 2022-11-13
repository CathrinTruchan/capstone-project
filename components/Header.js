import styled from "styled-components";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <StyledHeaderSection>
      <StyledTitle>Your Daily Flow</StyledTitle>
      <LogoutButton />
    </StyledHeaderSection>
  );
}

const StyledHeaderSection = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  z-index: 60;
  background: var(--primary-gradient);
`;

const StyledTitle = styled.h1`
  color: var(--text-light);
  text-align: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  font-family: "Montserrat Alternates";
  font-size: 1.8rem;
`;
