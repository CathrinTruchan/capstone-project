import Link from "next/link";
import styled from "styled-components";

export default function Error404() {
  return (
    <>
      <h1>Dear Yogi,</h1>
      <StyledSection>
        <p>we are sorry, this page doesn&apos;t exist.</p>
        <p>
          Have a look at the <Link href="/">homepage.</Link>
        </p>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  text-align: center;
  margin-top: 2rem;
`;
