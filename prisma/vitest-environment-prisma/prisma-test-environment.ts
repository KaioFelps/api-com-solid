import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    // código executado antes de cada ARQUIVO DE TESTE
    console.log("Setup");

    return {
      // após os testes
      teardown() {
        console.log("Teardown");
      },
    };
  },
};
