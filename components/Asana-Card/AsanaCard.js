import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function AsanaCard({ name, img, id }) {
  return (
    <StyledArticle>
      <Image src={img} alt={name} width={100} height={100} layout="fixed" />
      <section>
        <h2>{name}</h2>
        <Link href={`/asanas/${id}`} passHref>
          <StyledLink>Mehr Infos</StyledLink>
        </Link>
      </section>
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

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
