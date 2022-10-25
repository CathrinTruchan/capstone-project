import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import asanas from "../../db";
import { useState } from "react";
import { MainButton } from "../../components/MainButton";
import { nanoid } from "nanoid";
import SearchBar from "../../components/SearchBar";

export default function Flow({ searchQuery, setSearchQuery }) {
  const [selectedAsanas, setSelectedAsanas] = useState([]);
  const [open, setOpen] = useState(false);

  function deleteAsana(cardID) {
    const filteredAsanas = selectedAsanas.filter(
      (selectedAsana) => selectedAsana.flowListId !== cardID
    );
    setSelectedAsanas(filteredAsanas);
  }

  function autoScroll() {
    setTimeout(() => {
      window.scrollBy({ top: 500, behavior: "smooth" });
    });
  }

  return (
    <StyledContainer>
      <h2>Your Flow for today:</h2>

      <StyledListWithMargin>
        {selectedAsanas.map((asana, index) => (
          <li key={index}>
            <AsanaCard
              name={asana.english_name}
              img={asana.img_url}
              id={asana.id}
              deleteCard={() => deleteAsana(asana.flowListId)}
              showDeleteButton={true}
            />
          </li>
        ))}
      </StyledListWithMargin>

      {!open && (
        <MainButton
          type="primary"
          onClick={() => setOpen(true)}
          margin="-15rem auto 5rem auto"
        >
          + Add Asanas
        </MainButton>
      )}
      {!open && selectedAsanas.length > 0 && (
        <MainButton
          type="secondary"
          onClick={() => setSelectedAsanas([])}
          margin="-3rem auto 5rem auto"
        >
          X Reset flow
        </MainButton>
      )}

      <StyledWrapper>
        {open && (
          <AddAsanaSection>
            <SectionHeader>
              <StyledH3>You added {selectedAsanas.length} Asanas</StyledH3>
              <StyledCloseButton
                aria-label="close"
                onClick={() => setOpen(false)}
              >
                X
              </StyledCloseButton>
              <SearchBar setSearchQuery={setSearchQuery} />
            </SectionHeader>

            <StyledList>
              {asanas.map((asana) => {
                const nameInLowerCase = asana.english_name.toLowerCase();
                const searchQueryInLowerCase = searchQuery.toLowerCase();

                if (nameInLowerCase.includes(searchQueryInLowerCase)) {
                  return (
                    <StyledListItem key={asana.id}>
                      <p>{asana.english_name}</p>
                      <StyledAddButton
                        aria-label="add asana"
                        onClick={() => {
                          setSelectedAsanas([
                            ...selectedAsanas,
                            { ...asana, flowListId: nanoid() },
                          ]);
                          autoScroll();
                        }}
                      >
                        +
                      </StyledAddButton>
                    </StyledListItem>
                  );
                }
              })}
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
  background-color: var(--background-neutral);
  color: var(--highlight);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  &:active {
    background-color: var(--highlight);
    color: var(--text-light);
  }
`;

const AddAsanaSection = styled.section`
  position: fixed;
  bottom: 0;
  height: 45vh;
  width: 100%;
  background: var(--primary-gradient);
  padding: 3rem;
  z-index: 100;
  box-shadow: var(--drop-shadow-color);
  overflow-y: scroll;
  color: var(--text-light);
`;

const StyledH3 = styled.h3`
  text-align: center;
  color: var(--text-light);
`;

const StyledContainer = styled.section`
  position: relative;
`;

const StyledCloseButton = styled.button`
  border: none;
  background-color: var(--background-neutral);
  color: var(--primary);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const SectionHeader = styled.section`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--background-neutral);
  background-color: transparent;
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledListWithMargin = styled.ul`
  list-style: none;
  margin-bottom: 20rem;
`;
