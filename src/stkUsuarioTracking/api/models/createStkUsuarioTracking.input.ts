import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import exp from 'constants';

@InputType()
export class createStkUsuarioTrackingInput {
  @Field()
  cedula: string;

  @Field()
  primerNombre: string;

  @Field()
  segundoNombre: string;

  @Field()
  primerApellido: string;

  @Field()
  segundoApellido: string;

  @Field()
  email: string;

  @Field()
  clave: string;

  @Field((type) => Int, { nullable: true })
  objSucursalId?: number;

  @Field()
  activo: boolean;
}

@InputType()
export class UpdateStkUsuarioTrackingInput extends PartialType(
  createStkUsuarioTrackingInput,
) {
  @Field((type) => Int)
  id: number;
}

@InputType()
export class getMultiplesStkUsuariosTrackingInput {
  @Field((type) => [Int], { nullable: true })
  usuarios?: number[];

  @Field((type) => [String], { nullable: true })
  emails?: string[];
}

@InputType()
export class getStkUsuarioTrackingInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  email?: string;
}

@InputType()
export class deleteStkUsuariosTrackingInput {
  @Field((type) => [Int])
  id: number;
}
