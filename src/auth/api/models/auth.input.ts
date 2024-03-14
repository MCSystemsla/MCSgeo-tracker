import { Field, InputType } from '@nestjs/graphql';
import { getStkUsuariosTrackingInput } from 'src/stkUsuarioTracking/api/models/createStkUsuarioTracking.input';

@InputType()
export class LoginInput {
  @Field()
  usuario: getStkUsuariosTrackingInput;

  @Field()
  clave: string;
}
