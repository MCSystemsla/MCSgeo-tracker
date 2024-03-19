import { Module } from '@nestjs/common';
import { stkEmpresaResolver } from './api/resolvers/stkEmpresa.resolver';
import { stkEmpresaService } from './api/services/stkEmpresa.service';

@Module({
  controllers: [],
  providers: [stkEmpresaResolver, stkEmpresaService],
})
export class stkEmpresaModule {}
