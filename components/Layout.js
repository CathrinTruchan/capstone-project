import Header from "./Header";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  margin: 8rem 2rem 2rem 1rem;
`;
