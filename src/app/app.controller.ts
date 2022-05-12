import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from '../modules/auth/local-auth.guard';
import { AuthService } from '../modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
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
//         'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY1MTA4NjI3OCwiZXhwIjoxNjUxMDg2MzM4fQ.5rPpK2trR7UpMM0iqzLK9rSNWAkq6ahQiXb1SyfTqbc"
//     },
// })

// await query.json()
