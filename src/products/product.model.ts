export class Product {
  //using public is the same as this.id=id etc like it would normally be
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
