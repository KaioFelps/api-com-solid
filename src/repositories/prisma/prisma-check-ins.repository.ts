import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepositoryInterface } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error("Method not implemented.");
  }
}
