import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  //private is recommended here, we want to be able to edit the products table only through the methods
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateSingleProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    //one away
    // const product = this.findProduct(prodId)[0];
    // const index = this.findProduct(prodId)[1];
    //second way
    const [product, indexOfProduct] = this.findProduct(prodId);
    const updatedProduct = {
      ...product,
      title: title,
      description: description,
      price: price,
    };
    //check if empty fields first

    //const updatedProduct = { ...product }
    // if (title) {
    //   updatedProduct.title = title;
    // }
    // if (description) {
    //   updatedProduct.description = description;
    // }
    // if (price) {
    //   updatedProduct.price = price;
    // }
    this.products[indexOfProduct] = updatedProduct;
  }

  deleteSingleProduct(prodId: string) {
    // const deletedIndex = this.findProduct(prodId)[1];
    // this.products.splice(deletedIndex, 1);
    this.products = this.products.filter((product) => product.id !== prodId);
  }

  //this method can only be called form inside this server - private, i make it because i need it in getSingleProduct and updateSingleProduct
  //Adding type of return, which will be an array of [Product, number]
  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    const productItem = this.products[productIndex];
    // if (!productItem) {
    //   return new NotFoundException('Product with given id could not be found');
    // }
    return [productItem, productIndex];
  }
}
