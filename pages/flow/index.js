import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { getAsanaByID } from "../../db";
import { useState } from "react";

export default function Flow() {
  const [flowAsanaIds, setFlowAsanaIds] = useState(["5", "2", "3", "4"]);

  const flowAsanas = flowAsanaIds.map((item) => {
    return getAsanaByID(item);
  });

  return (
    <>
      <h2>Your flow for today:</h2>
      <StyledList>
        {flowAsanas.map((asana) => {
          return (
            <li key={asana.id}>
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
