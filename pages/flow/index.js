import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import asanas from "../../db";

export default function Flow({
  flowAsanaIds,
  setFlowAsanaIds,
  selectedAsanaIds,
  setSelectedAsanaIds,
}) {
  const flowAsanas = flowAsanaIds.map((id) => {
    return getAsanaByID(id);
  });

  return (
    <>
      <StyledH2>Choose your Flow for today:</StyledH2>
      <AddAsanaSection>
        <StyledList>
          {asanas.map((asana) => {
            return (
              <StyledListItem key={asana.id}>
                <h3>{asana.english_name}</h3>
                <StyledAddButton
                  onClick={() =>
                    setSelectedAsanaIds([...selectedAsanaIds, asana.id])
                  }
                >
                  <a>Add to flow</a>
                </StyledAddButton>
              </StyledListItem>
            );
          })}
        </StyledList>
      </AddAsanaSection>
      <CreateButton onClick={() => setFlowAsanaIds(selectedAsanaIds)}>
        Create your flow
      </CreateButton>

      <StyledH2>Your flow for today:</StyledH2>
      <StyledList>
        {flowAsanas.map((asana, index) => {
          return (
            <li key={index}>
              <AsanaCard
                name={asana.english_name}
                img={asana.img_url}
                id={asana.id}
              />
            </li>
          );
        })}
      </StyledList>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 2rem;
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
  overflow: scroll;
  margin: auto;
`;

const StyledH2 = styled.h2`
  text-align: center;
`;

const CreateButton = styled.button`
  width: 10rem;
  margin: 2rem auto;
  display: block;
`;
