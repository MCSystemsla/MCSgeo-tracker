import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  controllers: [],
  providers: [AuthResolver, AuthService],
})
export class authModule {}
