import styled from "styled-components";
import Image from "next/image";

export default function AsanaCard({ name }) {
  return (
    <section>
      <Image src="" alt={name} width={500} height={500} layout="responsive" />
      <h2>{name}</h2>
    </section>
  );
}
