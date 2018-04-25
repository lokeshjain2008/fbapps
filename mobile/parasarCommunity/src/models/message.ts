import { TimeInfo } from "./base-interfaces";

export interface IMessage extends TimeInfo{
  title: string;
  message: string;
  id: string;
  category: string;
  image: string;
}
