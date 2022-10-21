import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import asanas from "../../db";
import { useState } from "react";

export default function Flow() {
  const [flowAsanaIds, setFlowAsanaIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [countAsanas, setCountAsanas] = useState(0);

  function sumUpAsanas() {
    setCountAsanas((prev) => prev + 1);
  }

  const flowAsanas = flowAsanaIds.map((id) => {
    return getAsanaByID(id);
  });

  return (
    <StyledContainer>
      <StyledH2>Your Flow for today:</StyledH2>

      <StyledListMargin>
        {flowAsanas.map((asana, index) => (
          <li key={index}>
            <AsanaCard
              name={asana.english_name}
              img={asana.img_url}
              id={asana.id}
            />
          </li>
        ))}
      </StyledListMargin>

      {!open && (
        <StyledButton onClick={() => setOpen(true)}>Add Asanas</StyledButton>
      )}

      <StyledWrapper>
        {open && (
          <AddAsanaSection>
            <SectionHeader>
              <h2>You added {countAsanas} Asanas</h2>
              <StyledCloseButton onClick={() => setOpen(false)}>
                X
              </StyledCloseButton>
            </SectionHeader>

            <StyledList>
              {asanas.map((asana) => (
                <StyledListItem key={asana.id}>
                  <h3>{asana.english_name}</h3>
                  <StyledAddButton
                    onClick={() => {
                      setFlowAsanaIds([...flowAsanaIds, asana.id]);
                      sumUpAsanas();
                    }}
                  >
                    +
                  </StyledAddButton>
                </StyledListItem>
              ))}
            </StyledList>
          </AddAsanaSection>
        )}
      </StyledWrapper>
    </StyledContainer>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  align-items: center;
  margin: 1.2rem 0.5rem;
`;

const StyledAddButton = styled.button`
  border: none;
  background-color: #5d6bea;
  color: #f5f5f5;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  &:active {
    background-color: orange;
  }
`;

const AddAsanaSection = styled.section`
  position: fixed;
  bottom: 0;
  height: 30vh;
  width: 90%;
  background-color: #ffffff;
  border-radius: 22px;
  padding: 3rem;
  z-index: 10;
  box-shadow: 0px 0px 6px rgba(93, 107, 234, 0.8);
  overflow-y: scroll;
  margin: 2rem;
`;

const StyledH2 = styled.h2`
  text-align: center;
`;

const StyledButton = styled.button`
  width: 16rem;
  margin: 2rem auto;
  display: block;
  border: none;
  background-color: #ff8667;
  color: #f5f5f5;
  padding: 1rem 3rem;
  border-radius: 22px;
  font-size: 1.1rem;
  cursor: pointer;
`;

const StyledContainer = styled.section`
  position: relative;
`;

const StyledCloseButton = styled.button`
  border: none;
  background-color: #5d6bea;
  color: #f5f5f5;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const StyledCounter = styled.div`
  background-color: #ff8667;
  color: #f5f5f5;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  text-align: center;
  position: fixed;
  bottom: 19rem;
  right: 2rem;
  z-index: 40;
`;

const SectionHeader = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d3d3d3;
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledListMargin = styled.ul`
  list-style: none;
  margin-bottom: 20rem;
`;
