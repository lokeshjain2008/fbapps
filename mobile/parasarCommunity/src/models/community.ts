import { TimeInfo } from "./base-interfaces";

export interface ICommunity extends TimeInfo {
  id: string;
  name: string;
  display: string;
  categories: string[];
  description: string;
  owner: IOwner;
}

export interface IOwner{
  name: string;
  email: string;
  contace: number;
  facebook: string;
}
