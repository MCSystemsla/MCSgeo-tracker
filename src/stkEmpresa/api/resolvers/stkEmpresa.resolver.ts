import { Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/api/guards/jwt.guard';
import { stkEmpresaService } from '../services/stkEmpresa.service';
import {
  UpdateStkEmpresaInput,
  createStkEmpresaInput,
  deleteStkEmpresaInput,
  getStkEmpresaInput,
  getStkMultiplesEmpresasInput,
} from '../models/stkEmpresa.input';
import {
  stkEmpresaPayloadType,
  stkMultiplesEmpresasType,
} from '../models/stkEmpresa.type';

@Resolver()
export class stkEmpresaResolver {
  constructor(private stkEmpresaService: stkEmpresaService) {}

  @Mutation((returns) => stkEmpresaPayloadType)
  async createEmpresa(@Args('input') input: createStkEmpresaInput) {
    return this.stkEmpresaService.crearEmpresa(input);
  }

  @Query((returns) => stkEmpresaPayloadType)
  async getEmpresa(@Args('input') input: getStkEmpresaInput) {
    return this.stkEmpresaService.solicitarEmpresa(input);
  }

  @Query((returns) => stkMultiplesEmpresasType)
  async getMultiplesEmpresas(
    @Args('input') input: getStkMultiplesEmpresasInput,
  ) {
    return this.stkEmpresaService.solicitarMultiplesEmpresas(input);
  }

  @Mutation((returns) => stkEmpresaPayloadType)
  async updateEmpresa(@Args('input') input: UpdateStkEmpresaInput) {
    return this.stkEmpresaService.actualizarEmpresa(input);
  }

  @Mutation((returns) => stkEmpresaPayloadType)
  async deleteEmpresa(@Args('input') input: deleteStkEmpresaInput) {
    return this.stkEmpresaService.eliminarEmpresa(input);
  }
}
