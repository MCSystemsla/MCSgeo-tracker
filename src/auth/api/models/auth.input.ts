import { Field, InputType } from '@nestjs/graphql';
import { getStkUsuarioTrackingInput } from 'src/stkUsuarioTracking/api/models/createStkUsuarioTracking.input';

@InputType()
export class LoginInput {
  @Field()
  usuario: getStkUsuarioTrackingInput;

  @Field()
  clave: string;
}
