import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTLoginType {
  @Field()
  accessToken: string;
}
