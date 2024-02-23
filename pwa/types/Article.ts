import { Item } from "./item";

export class Article implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public content?: string,
    public slug?: string
  ) {
    this["@id"] = _id;
  }
}
