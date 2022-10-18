import Head from "next/head";
import styled from "styled-components";
import AsanaCard from "../components/Asana-Card/AsanaCard";
import asanas from "../db";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Your Daily Flow</h1>

        {asanas.map((asana) => {
          return (
            <AsanaCard
              key={asana.id}
              name={asana.english_name}
              img={asana.img_url}
            />
          );
        })}
      </main>
    </div>
  );
}

const StyledHeadline = styled.h1`
  color: blue;
`;
