import { Item } from "./item";

export class Product implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public category?: string,
    public price?: number
  ) {
    this["@id"] = _id;
  }
}
