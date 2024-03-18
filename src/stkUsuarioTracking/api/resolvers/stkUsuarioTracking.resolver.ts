import { Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import { stkUsuarioTrackingService } from '../services/stkUsuarioTracking.service';
import {
  UpdateStkUsuarioTrackingInput,
  createStkUsuarioTrackingInput,
  deleteStkUsuariosTrackingInput,
  getStkUsuarioTrackingInput,
  getMultiplesStkUsuariosTrackingInput,
} from '../models/createStkUsuarioTracking.input';
import {
  stkUsuarioTrackingPayloadType,
  stkUsuarioTrackingType,
  stkUsuariosTrackingPayloadType,
} from '../models/stkUsuarioTracking.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/api/guards/jwt.guard';

@Resolver()
export class stkUsuarioTrackingResolver {
  constructor(private stkUsuarioTrackingService: stkUsuarioTrackingService) {}

  @Query((returns) => stkUsuariosTrackingPayloadType)
  async getMultipleUsersTracking(
    @Args('input') input: getMultiplesStkUsuariosTrackingInput,
  ) {
    return this.stkUsuarioTrackingService.solicitarMultiplesUsuarioTracking(
      input,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Query((returns) => stkUsuarioTrackingPayloadType)
  async getUserTracking(@Args('input') input: getStkUsuarioTrackingInput) {
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
