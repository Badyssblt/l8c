import { Node } from "@vue-flow/core";
import { Param } from "./params";
import { Steps } from "./data";

export interface NodeLocal extends Omit<Node, 'data'> {
  data: {
    label: string | null;
    step: Steps;
    params?: Param[];
  };
  params?: Param[] | null
}
