import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import { useState } from "react";
import asanas from "../../db";

export default function Flow() {
  const [flowAsanaIds, setFlowAsanaIds] = useState([]);

  const flowAsanas = flowAsanaIds.map((id) => {
    return getAsanaByID(id);
  });
  console.log(flowAsanas);
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
        <ul>
          {asanas.map((asana) => {
            return (
              <li key={asana.id}>
                <p>{asana.english_name}</p>
                <button
                  onClick={() => setFlowAsanaIds([...flowAsanaIds, asana.id])}
                >
                  Add to flow
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;
