import { flowDummys } from "../../db";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";
import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import asanas from "../../db";
import { useState } from "react";
import { MainButton } from "../../components/MainButton";
import { nanoid } from "nanoid";
import SearchBar from "../../components/SearchBar";
import LevelFilter from "../../components/LevelFilter";

export default function FlowPage() {
  const [flows, setFlows] = useLocalStorage("flows", flowDummys);
  const router = useRouter();
  const { id } = router.query;
  const [selectedAsanas, setSelectedAsanas] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("all");

  const currentFlow = flows.find((flow) => flow.id === id);
  const name = currentFlow?.name || "Your Flow";
  const hours = currentFlow?.duration?.hours || "";
  const minutes = currentFlow?.duration?.minutes || "";

  console.log(currentFlow);

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
    <>
      <section>
        <h1>{name}</h1>
        <p>
          {parseInt(hours) > 0 && <span>{hours}h</span>}
          {parseInt(minutes) > 0 && <span> {minutes}min</span>}
        </p>
      </section>
      <StyledContainer>
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
                  onClick={() => {
                    setOpen(false);
                    setSearchQuery("");
                    setFilterQuery("all");
                  }}
                >
                  X
                </StyledCloseButton>
              </SectionHeader>
              <SearchBar setSearchQuery={setSearchQuery} />
              <LevelFilter setFilterQuery={setFilterQuery} />
              <StyledList>
                {asanas
                  .filter((asana) => {
                    const nameInLowerCase = asana.english_name.toLowerCase();
                    const searchQueryInLowerCase = searchQuery.toLowerCase();
                    return nameInLowerCase.includes(searchQueryInLowerCase);
                  })
                  .filter((asana) => {
                    if (filterQuery !== "all") {
                      return asana.levels[0] === filterQuery;
                    } else return asana;
                  })
                  .map((asana) => {
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
                  })}
              </StyledList>
            </AddAsanaSection>
          )}
        </StyledWrapper>
      </StyledContainer>
    </>
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
  background-color: transparent;
  flex-wrap: wrap;
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledListWithMargin = styled.ul`
  list-style: none;
  margin-bottom: 20rem;
`;
