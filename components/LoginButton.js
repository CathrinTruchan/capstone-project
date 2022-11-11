import { useSession, signIn } from "next-auth/react";
import { MainButton } from "./MainButton";

export default function LoginButton() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <MainButton
          margin="2rem auto"
          type="primary"
          onClick={() => signIn("github")}
        >
          Sign in
        </MainButton>
      </>
    );
  }
}
