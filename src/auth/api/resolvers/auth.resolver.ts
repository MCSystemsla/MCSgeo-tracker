import { Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../models/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => String)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }
}
