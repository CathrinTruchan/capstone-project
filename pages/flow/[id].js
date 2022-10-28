import { flowDummys } from "../../db";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

export default function FlowPage() {
  const [flows, setFlows] = useLocalStorage("flows", flowDummys);
  const router = useRouter();
  const { id } = router.query;

  const currentFlow = flows.find((flow) => flow.id === id);
  const name = currentFlow?.name || "Not found";
  const hours = currentFlow?.duration?.hours || "Not found";
  const minutes = currentFlow?.duration?.minutes || "Not found";

  console.log(currentFlow);

  return (
    <>
      <h1>{name}</h1>
      <p>
        {hours}h{minutes}min
      </p>
    </>
  );
}
