import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';
import { ErrorType } from 'src/globaltypes/global.types';

@ObjectType()
export class stkEmpresaType {
  @Field((type) => Int)
  id: number;

  @Field()
  codigo: string;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field()
  activo: boolean;

  @Field()
  fechaCreacion: Date;

  @Field((type) => Int, { nullable: true })
  objUsuarioCreacionId: number;
}

export const stkEmpresaPayloadType = createUnionType({
  name: 'stkEmpresaPayloadType',
  types: () => [stkEmpresaType, ErrorType] as const,
  resolveType(value) {
    if (value.id) {
      return stkEmpresaType;
    }
    if (value.errorName) {
      return ErrorType;
    }
    return null;
  },
});

@ObjectType()
export class stkMultiplesEmpresasType {
  @Field((type) => [stkEmpresaType])
  empresas: stkEmpresaType[];
}

export const getStkMultiplesEmpresasPayloadType = createUnionType({
  name: 'getStkMultiplesEmpresasPayloadType',
  types: () => [stkMultiplesEmpresasType, ErrorType] as const,
  resolveType(value) {
    if ('empresa' in value) {
      return stkMultiplesEmpresasType;
    } else if ('errorName' in value) {
      return ErrorType;
    }
  },
});
