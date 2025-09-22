import { Param } from "./params";

export type Data = {
  category: string;
  steps: Steps[];
};

export type Steps = {
  name: string | null;
  type: string | null;
  params: Param[];
  key: string;
};
