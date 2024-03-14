import { Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import { stkUsuarioTrackingService } from '../services/stkUsuarioTracking.service';
import {
  UpdateStkUsuarioTrackingInput,
  createStkUsuarioTrackingInput,
  deleteStkUsuariosTrackingInput,
  getStkUsuariosTrackingInput,
} from '../models/createStkUsuarioTracking.input';
import {
  stkUsuarioTrackingPayloadType,
  stkUsuarioTrackingType,
  stkUsuariosTrackingPayloadType,
} from '../models/stkUsuarioTracking.type';

@Resolver()
export class stkUsuarioTrackingResolver {
  constructor(private stkUsuarioTrackingService: stkUsuarioTrackingService) {}

  @Query((returns) => stkUsuariosTrackingPayloadType)
  async getUsersTracking(@Args('input') input: getStkUsuariosTrackingInput) {
    return this.stkUsuarioTrackingService.solicitarUsuarioTracking(input);
  }
  @Mutation((returns) => stkUsuarioTrackingPayloadType)
  async createUserTracking(
    @Args('input') input: createStkUsuarioTrackingInput,
  ) {
    return this.stkUsuarioTrackingService.crearUsuarioTracking(input);
  }

  @Mutation((returns) => stkUsuarioTrackingPayloadType)
  async updateUserTracking(
    @Args('input') input: UpdateStkUsuarioTrackingInput,
  ) {
    return this.stkUsuarioTrackingService.actualizarUsuarioTracking(input);
  }

  @Mutation((returns) => stkUsuarioTrackingPayloadType)
  async deleteUserTracking(
    @Args('input') input: deleteStkUsuariosTrackingInput,
  ) {
    return this.stkUsuarioTrackingService.eliminarUsuarioTracking(input);
  }
}
