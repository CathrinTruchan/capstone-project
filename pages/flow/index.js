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
    <StyledContainer>
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

      {open && (
        <AddAsanaSection>
          <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
          <StyledList>
            {asanas.map((asana) => (
              <StyledListItem key={asana.id}>
                <h3>{asana.english_name}</h3>
                <StyledAddButton
                  onClick={() => setFlowAsanaIds([...flowAsanaIds, asana.id])}
                >
                  <a>+</a>
                </StyledAddButton>
              </StyledListItem>
            ))}
          </StyledList>
        </AddAsanaSection>
      )}
    </StyledContainer>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`;

const StyledAddButton = styled.div`
  all: unset;
  cursor: pointer;
  background-color: #5d6bea;
  color: #f5f5f5;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  &:active {
    background-color: orange;
  }
`;

const AddAsanaSection = styled.section`
  position: absolute;
  top: 4rem;
  right: 0;
  height: 80vh;
  background-color: #ffffff;
  border-radius: 22px;
  padding: 1.5rem;
  z-index: 5;
  box-shadow: 0px 0px 4px rgba(93, 107, 234, 0.42);
  overflow-y: scroll;
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

const StyledContainer = styled.section`
  position: relative;
`;

const CloseButton = styled.div`
  background-color: #5d6bea;
  color: #f5f5f5;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer; ;
`;
