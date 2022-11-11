import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import CreateFlowForm from "/components/CreateFlowForm";
import FlowCard from "/components/FlowCard";
import { getAllFlows } from "/services/flowService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { AddButton } from "../components/AddButton";
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const flowsDB = await getAllFlows(session.user.email);
    return {
      props: { flowsDB: flowsDB },
    };
  } else return { props: {} };
}

export default function Home({ flowsDB }) {
  const [openForm, setOpenForm] = useState(false);
  const [editFormId, setEditFormId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
    setIsUpdating(true);
  };
  useEffect(() => {
    setIsUpdating(false);
  }, [flowsDB]);

  function toggleOpenForm() {
    setOpenForm((prev) => !prev);
  }

  async function handleFlowPost(flowData) {
    try {
      const response = await fetch("/api/flows", {
        method: "POST",
        body: JSON.stringify(flowData),
      });

      const result = await response.json();
      if (result.createdId) {
        router.push(`/flow/${result.createdId}`);
      } else {
        alert("Creating a flow did not work!!");
      }
    } catch (error) {
      console.error(error);
    }
    setOpenForm(false);
  }

  async function handleFlowUpdate(flowData) {
    try {
      const response = await fetch(`/api/flows/${flowData.id}`, {
        method: "PATCH",
        body: JSON.stringify(flowData),
      });

      const result = await response.json();
      if (result.id) {
        router.push(`/flow/${result.id}`);
      } else {
        alert("Updating the flow did not work!!");
      }
    } catch (error) {
      console.error(error);
    }
    setOpenForm(false);
    setEditFormId(null);
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/flows/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id),
      });

      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
    refreshData();
  }

  function cancelEditFlow() {
    setEditFormId(null);
  }

  function closeForm() {
    setOpenForm(false);
  }

  return (
    <div>
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StyledH2>NAMASTE,</StyledH2>
        {session && <StyledH2>{session.user.name.toUpperCase()}</StyledH2>}
        <h3>Let&apos;s flow together</h3>
        <ImageWrapper>
          <Image
            src="/images/animation-start-s4.gif"
            width={300}
            height={256}
            alt="yoga"
            layout="fixed"
            priority
          />
        </ImageWrapper>

        <LoginButton />

        {session && (
          <StyledWrapper>
            <h2>Your Flows: </h2>
            <StyledParagraph>
              Choose a flow or create a new one:
            </StyledParagraph>
            {flowsDB.map((flow) => (
              <FlowCard
                key={flow.id}
                name={flow.name}
                hours={flow.hours}
                minutes={flow.minutes}
                id={flow.id}
                deleteFlow={() => handleDelete(flow.id)}
                setEditFormId={() => setEditFormId(flow.id)}
              />
            ))}
            {openForm && (
              <CreateFlowForm
                flows={flowsDB}
                handleFlowPost={handleFlowPost}
                closeForm={closeForm}
              />
            )}
            {editFormId != null &&
              flowsDB.map(
                (flow) =>
                  flow.id === editFormId && (
                    <CreateFlowForm
                      key={flow.id}
                      flows={flowsDB}
                      id={flow.id}
                      editFormId={editFormId}
                      defaultName={flow.name}
                      defaultHours={flow.hours}
                      defaultMinutes={flow.minutes}
                      handleFlowUpdate={handleFlowUpdate}
                      cancelEditFlow={cancelEditFlow}
                    />
                  )
              )}
            <AddButton aria-label="add a flow" onClick={toggleOpenForm}>
              +
            </AddButton>
          </StyledWrapper>
        )}
      </main>
    </div>
  );
}

const StyledH2 = styled.h2`
  font-size: 2rem;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledWrapper = styled.section`
  margin-top: 3rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
