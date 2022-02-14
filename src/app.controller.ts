import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

// all requests to / path
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // get requests to / path
  @Get()

  // set Header at my response
  // @Header('Content-type', 'text/html')

  // returns applicaion/json response
  getHello(): { name: string } {
    return { name: 'Nikolas' };
  }
  // returns text/html, pure string response
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
