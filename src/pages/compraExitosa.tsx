import { getPaymentData } from "@/utils/mpLogic";
import { insertNewClient } from "@/utils/supabaseLogic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Cliente = {
  nombre: string;
  apellido: string;
  email: string;
};

export default function CompraExitosa() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});
  const [client, setClient] = useState<Cliente | {}>({});

  async function fetchData(id: string) {
    console.log("id", id);
    const payment = await getPaymentData(id);
    console.log("payment", payment);
  }

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      setQueryParams(query);

      const client: Cliente = {
        nombre: query.nombre,
        apellido: query.apellido,
        email: query.email,
      };

      setClient(client);
      insertNewClient(client);

      const id = query.collection_id as string;

      fetchData(id);
    }
  }, [router.isReady]);

  return (
    <div>
      <h1 className="font-sans">Compra Exitosa</h1>
      <h2 className="font-mono">Cliente que compró:</h2>
      <ul>
        {Object.entries(queryParams).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
