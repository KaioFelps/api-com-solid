import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please, provide a database url.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    // código executado antes de cada ARQUIVO DE TESTE
    const newSchema = randomUUID();
    const newDatabaseUrl = generateDatabaseUrl(newSchema);
    process.env.DATABASE_URL = newDatabaseUrl;

    // o deploy serve para que o prisma não compare o banco de dados, pois o deploy pula essa etapa, diferente do dev
    execSync("npx prisma migrate deploy");

    return {
      // após os testes
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${newSchema}" CASCADE` // CASCADE faz com que, caso alguma informação dependa desse schema, ela também seja apagada. Isso vai apagar também os índices e chaves primárias.
        );

        await prisma.$disconnect();
      },
    };
  },
};
