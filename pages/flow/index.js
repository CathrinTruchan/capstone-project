import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import { useState } from "react";
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
      <h2>Your flow for today:</h2>
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

      <section>
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
                  Add to flow
                </StyledAddButton>
              </StyledListItem>
            );
          })}
        </StyledList>
      </section>
      <button onClick={() => setFlowAsanaIds(selectedAsanaIds)}>
        Create your flow
      </button>
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
`;
