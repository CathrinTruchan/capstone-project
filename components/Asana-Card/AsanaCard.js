import styled from "styled-components";
import Image from "next/image";

export default function AsanaCard({ name, img }) {
  return (
    <StyledArticle>
      <ImageWrapper>
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          layout="responsive"
        />
      </ImageWrapper>
      <h2>{name}</h2>
    </StyledArticle>
  );
}

const ImageWrapper = styled.section`
  width: 100px;
  height: 100px;
`;

const StyledArticle = styled.article`
  border-radius: 22px;
  box-shadow: 0px 0px 4px rgba(93, 107, 234, 0.42);
  display: flex;
  gap: 3rem;
  justify-content: center;
  padding: 1.5rem 3rem 1.5rem 3rem;
  width: 60vw;
  margin: 3rem auto 3rem auto;
`;
