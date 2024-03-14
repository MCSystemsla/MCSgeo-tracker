import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';
import { ErrorType } from 'src/globaltypes/global.types';

@ObjectType()
export class stkUsuarioTrackingType {
  @Field((type) => Int)
  id: number;

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

  @Field((type) => Int, { nullable: true })
  objSucursalId?: number;

  @Field()
  activo: boolean;

  @Field()
  fechaCreacion: Date;
}

export const stkUsuarioTrackingPayloadType = createUnionType({
  name: 'stkUsuarioTrackingPayloadType',
  types: () => [stkUsuarioTrackingType, ErrorType] as const,
  resolveType(value) {
    if (value.id) {
      return stkUsuarioTrackingType;
    }
    if (value.errorName) {
      return ErrorType;
    }
    return null;
  },
});

@ObjectType()
export class stkUsuariosTrackingType {
  @Field((type) => [stkUsuarioTrackingType])
  usuarios: stkUsuarioTrackingType[];
}
export const stkUsuariosTrackingPayloadType = createUnionType({
  name: 'stkUsuariosTrackingPayloadType',
  types: () => [stkUsuariosTrackingType, ErrorType] as const,
  resolveType(value) {
    if ('usuarios' in value) {
      return stkUsuariosTrackingType;
    }
    if ('errorName' in value) {
      return ErrorType;
    }
    return null;
  },
});
