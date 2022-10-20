import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import asanas from "../../db";
import { useState } from "react";

export default function Flow() {
  const [flowAsanaIds, setFlowAsanaIds] = useState([]);
  const [open, setOpen] = useState(false);

  const flowAsanas = flowAsanaIds.map((id) => {
    return getAsanaByID(id);
  });

  return (
    <>
      <StyledH2>Your Flow for today:</StyledH2>

      <StyledList>
        {flowAsanas.map((asana, index) => (
          <li key={index}>
            <AsanaCard
              name={asana.english_name}
              img={asana.img_url}
              id={asana.id}
            />
          </li>
        ))}
      </StyledList>

      <StyledButton onClick={() => setOpen(true)}>
        Create your Flow
      </StyledButton>
      <p onClick={() => setOpen(false)}>X</p>

      {open && (
        <AddAsanaSection>
          <StyledList>
            {asanas.map((asana) => (
              <StyledListItem key={asana.id}>
                <h3>{asana.english_name}</h3>
                <StyledAddButton
                  onClick={() => setFlowAsanaIds([...flowAsanaIds, asana.id])}
                >
                  <a>Add to flow</a>
                </StyledAddButton>
              </StyledListItem>
            ))}
          </StyledList>
        </AddAsanaSection>
      )}
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
`;

const StyledAddButton = styled.button`
  all: unset;
  cursor: pointer;
  &:active {
    color: orange;
  }
`;

const AddAsanaSection = styled.section`
  width: 400px;
  height: 400px;
  overflow-y: scroll;
  margin: 1.5rem auto;
  background-color: #f5f5f5;
  border-radius: 22px;
  padding: 1.5rem;
`;

const StyledH2 = styled.h2`
  text-align: center;
`;

const StyledButton = styled.button`
  width: 16rem;
  margin: 2rem auto;
  display: block;
  border: none;
  background-color: #5d6bea;
  color: #f5f5f5;
  padding: 0.5rem 3rem;
  border-radius: 22px;
`;
