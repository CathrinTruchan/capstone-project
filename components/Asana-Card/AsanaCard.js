import styled from "styled-components";
import Image from "next/image";

export default function AsanaCard({ name, img }) {
  return (
    <section>
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
    </section>
  );
}

const ImageWrapper = styled.section`
  width: 100px;
  height: 100px;
`;
