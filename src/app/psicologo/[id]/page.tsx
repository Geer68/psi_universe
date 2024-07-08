"use client";

import Container from "@/components/Container";

import { useRouter } from "next/navigation";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <Container className="mt-20">
      <h1>Psicologo</h1>
      <p>Post: {params.id}</p>
      <img src="/logoNegativo.png" alt="" />
    </Container>
  );
}
