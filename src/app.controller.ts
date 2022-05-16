import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// query login
// var query =
// await fetch("/auth/login", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"username": "john", "password": "changeme"}),
// })

// token response
// await query.json()

// get user profile le paso el token
// var query =
// await fetch("/profile", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//         'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI0NTUxODYsImV4cCI6MTY1MjQ1NTI0Nn0.btPoBAreXyjoj8QA3tKle1h9_P0hm0L7BALaIaggGfA"
//     },
// })

// await query.json()
