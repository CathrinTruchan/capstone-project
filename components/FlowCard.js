import styled from "styled-components";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BsPen } from "react-icons/bs";

export default function FlowCard({
  name,
  hours,
  minutes,
  id,
  deleteFlow,
  setEditFormId,
}) {
  return (
    <FlowWrapper>
      <StyledButtonWrapper
        role="button"
        aria-label="delete"
        top="1.5rem"
        onClick={deleteFlow}
      >
        <StyledCloseIcon />
      </StyledButtonWrapper>

      <StyledButtonWrapper
        role="button"
        bottom="1.5rem"
        aria-label="edit"
        onClick={setEditFormId}
      >
        <StyledEditIcon />
      </StyledButtonWrapper>

      <h2>{name}</h2>
      <p>
        {hours}
        {parseInt(hours) > 0 ? "h" : ""} {minutes}
        {parseInt(minutes) > 0 ? "min" : ""}
      </p>
      <Link href={`/flow/${id}`} passHref>
        <StyledButton role="button">To the flow</StyledButton>
      </Link>
    </FlowWrapper>
  );
}

const FlowWrapper = styled.section`
  position: relative;
  box-shadow: var(--drop-shadow-bottom-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  padding: 2rem 2rem 1rem 2rem;
  &:hover {
    box-shadow: var(--drop-shadow-bottom-hover);
  }
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  color: var(--highlight);
  font-size: var(--font-small);
`;

const StyledEditIcon = styled(BsPen)`
  color: var(--primary);
  font-size: var(--font-small);
`;

const StyledButton = styled.button`
  width: 8rem;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: none;
  margin: 1rem 0;
  cursor: pointer;
  box-shadow: var(--drop-shadow-gray);
  color: var(--text-light);
  background-color: var(--primary-light);
  &:hover {
    background: var(--primary);
  }
`;

const StyledButtonWrapper = styled.button`
  all: unset;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: 2rem;
  &:hover {
    scale: 1.3;
  }
  &:active {
    scale: 1.3;
  }
`;
