import { useSession, signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";

export default function LogoutButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <StyledLogoutButton onClick={() => signOut()}>
          <StyledLogoutIcon />
        </StyledLogoutButton>
      </>
    );
  }
}

const StyledLogoutButton = styled.button`
  all: unset;
  position: fixed;
  top: 1.3rem;
  right: 0.7rem;
`;

const StyledLogoutIcon = styled(AiOutlineLogout)`
  color: white;
  font-size: 1.5rem;
  border-radius: 50%;
  &:hover {
    background-color: var(--background-neutral);
    color: var(--primary);
  }
`;
