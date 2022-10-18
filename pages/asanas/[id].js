import { getAsanaByID, getAllAsanas } from "../../db";
import Image from "next/image";
import styled from "styled-components";

export async function getStaticPaths() {
  const asanas = await getAllAsanas();
  const ids = asanas.map((asana) => asana.id);
  return {
    paths: ids.map((id) => ({ params: { id: id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const asana = await getAsanaByID(id);
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
      <h2>{asana.english_name}</h2>
      <h3>{asana.sanskrit_name}</h3>
      <p>{asana.description}</p>

      <StyledList>
        {asana.level.map((item, index) => {
          return <StyledListElement key={index}>{item}</StyledListElement>;
        })}
      </StyledList>
      <StyledBenefit>{asana.benefit}</StyledBenefit>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  border-radius: 32px;
  box-shadow: 0px 0px 4px rgba(93, 107, 234, 0.42);
  max-width: 500px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  position: relative;
`;

const StyledBenefit = styled.p`
  background-color: #5d6bea;
  padding: 1rem 1.5rem;
  color: #f5f5f5;
  border-radius: 22px;
  position: absolute;
  top: 12rem;
  right: -1rem;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 2rem 0 2rem -8rem;
`;

const StyledListElement = styled.li`
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  color: #5d6bea;
  border-radius: 12px;
`;
