import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    //First way of getting the req.body
    //@Body() completeBody: {title: string, description: string, price: number},

    //Second way of getting the req.body
    @Body('title') prodTitle: string,
    @Body('description') prodDecription: string,
    @Body('price') prodPrice: number,

    //Third way with DTO

    // i dont have to specify type here, nestsjs understands it, normally it could be any, string or whatever
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDecription,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return { products: this.productsService.getProducts() };
  }

  @Get(':id')
  //: Product indicates what kind of response my getProduct has, returns a Product object
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDecription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateSingleProduct(
      prodId,
      prodTitle,
      prodDecription,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteSingleProduct(prodId);
    return 'Successfully Deleted';
  }
}
