import { getAsanaByID, getAllAsanas } from "../../db";
import Image from "next/image";
import styled from "styled-components";

export async function getStaticPaths() {
  const asanas = getAllAsanas();
  const ids = asanas.map((asana) => asana.id);
  return {
    paths: ids.map((id) => ({ params: { id: id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const asana = getAsanaByID(id);
  return {
    props: { asana: asana },
  };
}

export default function Asana({ asana }) {
  return (
    <StyledArticle>
      <Image
        src={asana.img_url}
        alt={asana.english_name}
        width={230}
        height={230}
        layout="fixed"
      />
      <h1>{asana.english_name}</h1>
      <h2>{asana.sanskrit_name}</h2>
      <StyledDescription>{asana.description}</StyledDescription>

      <StyledList>
        {asana.levels.map((item, index) => {
          return <StyledListElement key={index}>{item}</StyledListElement>;
        })}
      </StyledList>
      <StyledBenefit>{asana.benefit}</StyledBenefit>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  border-radius: 22px;
  box-shadow: var(--drop-shadow-gray);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 1.5rem;
  position: relative;
`;

const StyledBenefit = styled.p`
  background-color: var(--highlight);
  padding: 0.8rem 1.2rem;
  color: var(--text-light);
  border-radius: 22px 10px 22px 10px;
  position: absolute;
  top: 12rem;
  right: -1rem;
  font-size: var(--font-small);
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const StyledListElement = styled.li`
  background-color: var(--background-neutral);
  padding: 0.5rem 1rem;
  color: var(--primary);
  border-radius: 16px;
  font-size: var(--font-small);
`;

const StyledDescription = styled.p`
  margin: 1.5rem;
  text-align: center;
`;
