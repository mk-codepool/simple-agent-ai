import { BaseMessage } from "@langchain/core/messages";
import { Annotation, StateGraph } from "@langchain/langgraph";

export const StateAnnotation = Annotation.Root({
  sentiment: Annotation<string>,
  messages: Annotation<BaseMessage[]>({
    reducer: (left: BaseMessage[], right: BaseMessage | BaseMessage[]) => {
      if (Array.isArray(right)) {
        return left.concat(right);
      }
      return left.concat([right]);
    },
    default: () => [],
  }),
});

export class AppUserStateGraph {
  public stateGraph!: StateGraph<typeof StateAnnotation>;
  public compiledGraph!: any;

  constructor() {
    this.stateGraph = new StateGraph(StateAnnotation);
  }
}