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
import { BsPen } from "react-icons/bs";

export default function FlowPage() {
  const [flows, setFlows] = useLocalStorage("flows", flowDummys);
  const router = useRouter();
  const { id } = router.query;
  const [openMenu, setOpenMenu] = useState(false);
  const [openDescriptionForm, setOpenDescriptionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("all");

  const currentFlow = flows.find((flow) => flow.id === id);
  const name = currentFlow?.name || "No flow found";
  const hours = currentFlow?.duration?.hours || "";
  const minutes = currentFlow?.duration?.minutes || "";
  const currentAsanas = currentFlow?.asanas || [];
  const description = currentFlow?.description || "";

  function updateFlow(id, asana) {
    setFlows(
      flows.map((flow) =>
        flow.id === id
          ? {
              ...flow,
              asanas: [...flow.asanas, { ...asana, flowListId: nanoid() }],
            }
          : flow
      )
    );
  }

  function onSubmitDescription(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { description } = Object.fromEntries(formData);
    const trimmedDescription = description.trim();

    if (trimmedDescription.length === 0) {
      alert("Please enter a description or close the input field");
    } else {
      setFlows(
        flows.map((flow) =>
          flow.id === id ? { ...flow, description: trimmedDescription } : flow
        )
      );
      toggleOpenForm();
    }
  }

  function resetFlow(id) {
    setFlows(
      flows.map((flow) => (flow.id === id ? { ...flow, asanas: [] } : flow))
    );
  }

  function deleteAsana(cardID) {
    const filteredAsanas = currentFlow.asanas.filter(
      (asana) => asana.flowListId !== cardID
    );
    setFlows(
      flows.map((flow) => {
        if (flow.id === id) {
          return {
            ...flow,
            asanas: filteredAsanas,
          };
        } else return flow;
      })
    );
  }

  function toggleOpenForm() {
    setOpenDescriptionForm((prev) => (prev = !prev));
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
        <StyledParagraph>
          {parseInt(hours) > 0 && <span>{hours}h</span>}
          {parseInt(minutes) > 0 && <span> {minutes}min</span>}
        </StyledParagraph>
        <StyledParagraph>
          {description}
          {description !== "" && <StyledEditIcon onClick={toggleOpenForm} />}
        </StyledParagraph>
        {description === "" && (
          <StyledEditButton onClick={toggleOpenForm}>
            Add description <BsPen />
          </StyledEditButton>
        )}
        {openDescriptionForm && (
          <StyledForm onSubmit={(event) => onSubmitDescription(event, id)}>
            <StyledTextArea
              rows="4"
              cols="38"
              id="description"
              name="description"
              aria-label="add description for flow"
              placeholder="add your description..."
              defaultValue={description}
            />

            <MainButton
              type="primary"
              width="5rem"
              aria-label="Save description"
            >
              Save
            </MainButton>
            <StyledDeleteButtonForm
              type="reset"
              aria-label="close input field for description"
              onClick={toggleOpenForm}
            >
              X
            </StyledDeleteButtonForm>
          </StyledForm>
        )}
      </section>
      <StyledContainer>
        <StyledListWithMargin>
          {currentAsanas.map((asana, index) => {
            return (
              <li key={index}>
                <AsanaCard
                  name={asana.english_name}
                  img={asana.img_url}
                  id={asana.id}
                  deleteCard={() => deleteAsana(asana.flowListId)}
                  showDeleteButton={true}
                />
              </li>
            );
          })}
        </StyledListWithMargin>

        {!openMenu && name != "No flow found" && (
          <MainButton
            type="primary"
            onClick={() => setOpenMenu(true)}
            margin="-15rem auto 5rem auto"
          >
            + Add Asanas
          </MainButton>
        )}
        {!openMenu && currentAsanas.length > 0 && (
          <MainButton
            type="secondary"
            onClick={() => resetFlow(id)}
            margin="-3rem auto 5rem auto"
          >
            X Reset flow
          </MainButton>
        )}

        <StyledWrapper>
          {openMenu && (
            <AddAsanaSection>
              <SectionHeader>
                <StyledH3>You added {currentAsanas.length} Asanas</StyledH3>
                <StyledCloseButton
                  aria-label="close"
                  onClick={() => {
                    setOpenMenu(false);
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
                            updateFlow(id, asana);
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

const StyledParagraph = styled.p`
  text-align: center;
  margin: 1rem 4rem;
`;

const StyledEditButton = styled.button`
  all: unset;
  color: #a9a9a9;
  margin: 1rem auto;
  display: block;
  background-color: white;
  cursor: pointer;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 2rem 3rem;
`;

const StyledTextArea = styled.textarea`
  all: unset;
  color: var(--text-dark);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--background-primary);
  margin: 1rem 2rem;
  box-shadow: var(--drop-shadow-bottom-color);
  font-family: "DM Sans";
`;

const StyledEditIcon = styled(BsPen)`
  color: #a9a9a9;
  margin-left: 0.8rem;
  font-size: var(--font-small);
`;

const StyledDeleteButtonForm = styled.button`
  border: none;
  position: absolute;
  top: 0;
  right: 1rem;
  background-color: var(--background-primary);
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
