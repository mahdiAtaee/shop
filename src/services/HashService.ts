import { randomBytes } from "crypto";
import { v4 as uuidV4 } from "uuid";

export const randomHash = (length:number = 20):string => {
  return randomBytes(length).toString("hex");
};

export const HashFromUUID = (): string => {
  return uuidV4();
};
