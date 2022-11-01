import styled from "styled-components";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export default function FlowCard({ name, hours, minutes, id, deleteFlow }) {
  return (
    <FlowWrapper>
      <StyledMenuIcon onClick={deleteFlow}></StyledMenuIcon>

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

const StyledMenuIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 0;
  right: 1.5rem;
  color: var(--highlight);
  font-size: var(--font-small);
`;
