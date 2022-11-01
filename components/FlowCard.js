import styled from "styled-components";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BsPen } from "react-icons/bs";
import { useState } from "react";

import CreateFlowForm from "./CreateFlowForm";

export default function FlowCard({
  name,
  hours,
  minutes,
  id,
  deleteFlow,
  editFlowBasicData,
}) {
  const [openEditForm, setOpenEditForm] = useState(false);

  return (
    <FlowWrapper>
      <StyledCloseIcon onClick={deleteFlow}></StyledCloseIcon>
      <StyledEditIcon onClick={() => setOpenEditForm(true)}></StyledEditIcon>

      <h2>{name}</h2>
      <p>
        {hours}
        {parseInt(hours) > 0 ? "h" : ""} {minutes}
        {parseInt(minutes) > 0 ? "min" : ""}
      </p>

      <Link href={`/flow/${id}`}>To the flow</Link>

      {openEditForm && (
        <CreateFlowForm
          editFlowBasicData={editFlowBasicData}
          openEditForm={true}
          id={id}
          defaultName={name}
          defaultHours={hours}
          defaultMinutes={minutes}
        />
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
  margin: 4rem auto;
  padding: 0 2rem 1rem 2rem;
  &:hover {
    box-shadow: var(--drop-shadow-bottom-hover);
  }
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 0;
  right: 1.5rem;
  color: var(--highlight);
  font-size: var(--font-small);
`;

const StyledEditIcon = styled(BsPen)`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  color: #a9a9a9;
  font-size: var(--font-small);
`;
