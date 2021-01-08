import { IBase } from "./Base";

interface ITab {
  component: JSX.Element;
  label: string;
}

export interface ITabs extends IBase {
  defaultTab?: number;
  tabs: ITab[];
}
