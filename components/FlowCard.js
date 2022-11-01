import styled from "styled-components";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

export default function FlowCard({ name, hours, minutes, id, deleteFlow }) {
  const [openCardMenu, setOpenCardMenu] = useState(false);

  function toggleOpenCardMenu() {
    setOpenCardMenu((prev) => (prev = !prev));
    console.log("click");
  }

  return (
    <FlowWrapper>
      <StyledMenuIcon onClick={toggleOpenCardMenu}></StyledMenuIcon>
      {openCardMenu && (
        <StyledCardMenu>
          <StyledList>
            <StyledListItems onClick={deleteFlow}>delete</StyledListItems>
            <StyledListItems>edit</StyledListItems>
          </StyledList>
        </StyledCardMenu>
      )}
      <h2>{name}</h2>
      <p>
        {hours}
        {parseInt(hours) > 0 ? "h" : ""} {minutes}
        {parseInt(minutes) > 0 ? "min" : ""}
      </p>

      <Link href={`/flow/${id}`}>To the flow</Link>
    </FlowWrapper>
  );
}

const FlowWrapper = styled.section`
  position: relative;
  box-shadow: var(--drop-shadow-bottom-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  padding: 0 2rem 1rem 2rem;
  &:hover {
    box-shadow: var(--drop-shadow-bottom-hover);
  }
`;

const StyledMenuIcon = styled(BsThreeDotsVertical)`
  position: absolute;
  top: 0.5rem;
  right: 2rem;
  color: var(--highlight);
  z-index: 30;
`;

const StyledCardMenu = styled.nav`
  position: absolute;
  padding: 1rem 0.5rem;
  top: 0.1rem;
  right: 2rem;
  z-index: 20;
  background-color: var(--background-neutral);
  box-shadow: var(--drop-shadow-gray);
  border-radius: 5px;
`;

const StyledList = styled.ul`
  list-style: none;
  text-align: right;
  margin: 2rem 0.5rem 0 0;
  font-size: var(--font-small);
`;

const StyledListItems = styled.li`
  margin-top: 0.3rem;
`;
