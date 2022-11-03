import styled from "styled-components";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledBackButton onClick={() => router.back()}>
      <StyledBackIcon />
    </StyledBackButton>
  );
}

const StyledBackButton = styled.button`
  all: unset;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--background-neutral);
  border-radius: 50%;
  position: fixed;
  top: 6rem;
  left: 1rem;
  z-index: 80;
`;

const StyledBackIcon = styled(IoIosArrowBack)`
  font-size: 1.3rem;
  margin: 0.1rem;
  color: var(--primary-light);
`;
