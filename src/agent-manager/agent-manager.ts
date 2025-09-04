import { ReactAgent } from "./agents/reac-agent.agent";

export class AgentManager {
  public reactAgent!: ReactAgent;

  constructor() {
    this.initAgents();
  }
  
  public initAgents() {
    this.reactAgent = new ReactAgent();
  }
}