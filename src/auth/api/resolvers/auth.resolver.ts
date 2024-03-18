import { Args, Int, Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../models/auth.input';
import { JWTLoginType } from '../models/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => JWTLoginType)
  async login(@Context('req') req, @Args('input') input: LoginInput) {
    console.log(req.headers);
    return this.authService.login(input);
  }
}
