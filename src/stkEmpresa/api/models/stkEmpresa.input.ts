import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class createStkEmpresaInput {
  @Field()
  codigo: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  activo: boolean;

  @Field((type) => Int, { nullable: true })
  objUsuarioCreacionId?: number;
}

@InputType()
export class UpdateStkEmpresaInput extends PartialType(createStkEmpresaInput) {
  @Field((type) => Int)
  id: number;
}

@InputType()
export class deleteStkEmpresaInput {
  @Field((type) => Int)
  id: number;
}

@InputType()
export class getStkEmpresaInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  codigo?: string;
}

@InputType()
export class getStkMultiplesEmpresasInput {
  @Field((type) => [Int], { nullable: true })
  id?: number[];

  @Field((type) => [String], { nullable: true })
  codigo?: string[];
}
