import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { stkUsuarioTrackingResolver } from './stkUsuarioTracking/api/resolvers/stkUsuarioTracking.resolver';
import { stkUsuarioTrackingModule } from './stkUsuarioTracking/stkUsarioTracking.module';
import { authModule } from './auth/api/auth.module';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    stkUsuarioTrackingModule,
    authModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
