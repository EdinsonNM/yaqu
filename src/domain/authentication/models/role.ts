import { jsonProperty, Serializable } from "ts-serializable";

export class Role extends Serializable {
 @jsonProperty(String)
 id?: string;
 @jsonProperty(String)
 name!: string;   
}