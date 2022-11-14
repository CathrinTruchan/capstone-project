import styled from "styled-components";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BsPen, BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function FlowCard({
  name,
  hours,
  minutes,
  id,
  deleteFlow,
  setEditFormId,
}) {
  const [openEditMenu, setOpenEditMenu] = useState(false);

  const toggleEditMenu = () => setOpenEditMenu((prev) => !prev);

  return (
    <FlowWrapper>
      <h2>{name}</h2>
      <p>
        {parseInt(hours) > 0 && <span>{hours}h</span>}
        {parseInt(minutes) > 0 && <span> {minutes}min</span>}
      </p>
      <Link href={`/flow/${id}`} passHref>
        <StyledButton role="button">To the flow</StyledButton>
      </Link>
      <StyledDotButton
        role="button"
        aria-label="openMenu"
        onClick={toggleEditMenu}
      >
        <StyledThreeDots />
      </StyledDotButton>
      {openEditMenu && (
        <StyledEditMenu>
          <StyledButton role="button" aria-label="delete" onClick={deleteFlow}>
            <StyledCloseIcon />
            Delete
          </StyledButton>

          <StyledButton role="button" aria-label="edit" onClick={setEditFormId}>
            <StyledEditIcon />
            Edit
          </StyledButton>
        </StyledEditMenu>
      )}
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
  background: linear-gradient(
    302.8deg,
    #ffffff 0%,
    rgba(241, 241, 241, 0.638316) 51.14%,
    rgba(217, 217, 217, 0) 100%
  );
  &:hover {
    box-shadow: var(--drop-shadow-bottom-hover);
  }
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  color: var(--background-primary);
  margin-right: 0.3rem;
`;

const StyledEditIcon = styled(BsPen)`
  color: var(--background-primary);
  margin-right: 0.3rem;
`;

const StyledButton = styled.button`
  width: 8rem;
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: none;
  margin: 1rem 0 2rem 0;

  cursor: pointer;
  box-shadow: var(--drop-shadow-gray);
  color: var(--text-light);
  background-color: var(--primary-light);
  &:hover {
    background: var(--primary);
  }
`;

const StyledEditMenu = styled.section`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const StyledDotButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const StyledThreeDots = styled(BsThreeDots)`
  color: var(--highlight);
  font-size: 1.3rem;
`;
