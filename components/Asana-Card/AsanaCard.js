import styled from "styled-components";
import Image from "next/image";

export default function AsanaCard({ name, img }) {
  return (
    <StyledArticle>
      <Image src={img} alt={name} width={100} height={100} layout="fixed" />

      <h2>{name}</h2>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  border-radius: 22px;
  box-shadow: 0px 0px 4px rgba(93, 107, 234, 0.42);
  display: flex;
  gap: 3rem;
  justify-content: space-evenly;
  padding: 1.5rem 3rem;
  max-width: 400px;
  margin: 3rem auto;
`;
