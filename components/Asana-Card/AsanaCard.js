import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function AsanaCard({ name, img, id }) {
  return (
    <StyledArticle>
      <StyledImageContainer>
        <Image src={img} alt={name} width={100} height={100} layout="fixed" />
      </StyledImageContainer>
      <section>
        <StyledH3>{name}</StyledH3>
        <Link href={`/asanas/${id}`} passHref>
          <StyledLink>Mehr Infos</StyledLink>
        </Link>
      </section>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  box-shadow: var(--drop-shadow-bottom-color);
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  align-items: center;
  margin: 4rem auto;
  padding: 0 2rem 1rem 2rem;
  &:hover {
    box-shadow: var(--drop-shadow-bottom-hover);
  }
`;

const StyledImageContainer = styled.div`
  grid-column: 2 / 3;
`;

const StyledH3 = styled.h3`
  grid-column: 3 / 4;
  text-align: left;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: var(--text-dark);
  grid-column: 3 / 4;
  text-align: left;
  cursor: pointer;
  font-size: var(--font-small);
  margin-top: 1rem;
`;
