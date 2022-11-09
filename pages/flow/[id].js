import { useRouter } from "next/router";
import styled from "styled-components";
import AsanaCard from "../../components/Asana-Card/AsanaCard";
import { useState } from "react";
import { MainButton } from "../../components/MainButton";
import { nanoid } from "nanoid";
import SearchBar from "../../components/SearchBar";
import LevelFilter from "../../components/LevelFilter";
import { BsPen } from "react-icons/bs";
import StyledBackButton from "../../components/BackButton";
import { getAllAsanas } from "../../services/asanaService";
import { getFlowById } from "/services/flowService";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const asanas = await getAllAsanas();
  const currentFlowDB = await getFlowById(id);
  return {
    props: { asanas: asanas, currentFlowDB: currentFlowDB },
  };
}

export default function FlowPage({ asanas, currentFlowDB }) {
  const router = useRouter();
  const { id } = router.query;
  const [flow, setFlow] = useState(currentFlowDB);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDescriptionForm, setOpenDescriptionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("all");

  async function handleFlowSave(data) {
    try {
      const response = await fetch(`/api/flows/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  function addAsanaToFlow(asana) {
    setFlow({
      ...flow,
      asanas: [...flow.asanas, { ...asana, flowListId: nanoid() }],
    });
  }

  function onSubmitDescription(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { description } = Object.fromEntries(formData);
    const trimmedDescription = description.trim();

    if (trimmedDescription.length === 0) {
      alert("Please enter a description or close the input field");
    } else {
      setFlow({ ...flow, description: trimmedDescription });
      toggleOpenForm();
    }
  }

  function resetFlow() {
    setFlow({ ...flow, asanas: [] });
  }

  function deleteAsana(cardID) {
    const filteredAsanas = flow.asanas.filter(
      (asana) => asana.flowListId !== cardID
    );
    setFlow({
      ...flow,
      asanas: filteredAsanas,
    });
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
        <StyledBackButton />

        <h2>{flow.name}</h2>
        <StyledParagraph>
          {parseInt(flow.hours) > 0 && <span>{flow.hours}h</span>}
          {parseInt(flow.minutes) > 0 && <span> {flow.minutes}min</span>}
        </StyledParagraph>
        <StyledParagraph>
          {flow.description}
          {flow.description !== "" && (
            <StyledEditIcon onClick={toggleOpenForm} />
          )}
        </StyledParagraph>
        {flow.description === "" && (
          <StyledEditButton onClick={toggleOpenForm}>
            Add description <BsPen />
          </StyledEditButton>
        )}
        {openDescriptionForm && (
          <StyledForm onSubmit={(event) => onSubmitDescription(event)}>
            <StyledTextArea
              rows="4"
              cols="30"
              id="description"
              name="description"
              aria-label="add description for flow"
              placeholder="add your description..."
              defaultValue={flow.description}
            />

            <MainButton
              type="primary"
              width="7rem"
              aria-label="Save description"
            >
              Save
            </MainButton>

            <StyledCloseButtonForm
              type="reset"
              aria-label="close input field for description"
              onClick={toggleOpenForm}
            >
              X
            </StyledCloseButtonForm>
          </StyledForm>
        )}
      </section>
      <StyledContainer>
        <StyledListWithMargin>
          {flow.asanas.map((asana) => {
            return (
              <li key={asana.flowListId}>
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

        {!openMenu && flow.name != "No flow found" && (
          <MainButton
            type="secondary"
            onClick={() => setOpenMenu(true)}
            margin="-15rem auto 5rem auto"
          >
            Add Asanas
          </MainButton>
        )}
        {!openMenu && flow.asanas.length > 0 && (
          <>
            <MainButton
              type="primary"
              onClick={() => handleFlowSave(flow)}
              margin="-3rem auto 5rem auto"
            >
              Save Flow
            </MainButton>

            <StyledResetButton onClick={resetFlow}>
              Reset flow
            </StyledResetButton>
          </>
        )}

        <StyledWrapper>
          {openMenu && (
            <AddAsanaSection>
              <SectionHeader>
                <StyledH3>You added {flow.asanas.length} Asanas</StyledH3>
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
                            addAsanaToFlow(asana);
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
  margin-left: -1rem;
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
  margin: 2rem auto;
  width: 17.5rem;
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

const StyledCloseButtonForm = styled.button`
  border: none;
  position: absolute;
  top: 1.3rem;
  right: 0.5rem;
  background-color: var(--background-primary);
  color: var(--highlight);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const StyledResetButton = styled.button`
  all: unset;
  display: block;
  margin: -3rem auto 5rem auto;
  color: var(--highlight);
  text-decoration: underline;
  cursor: pointer;
`;
