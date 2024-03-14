import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorType {
  @Field()
  errorName: string;

  @Field()
  message: string;
}
