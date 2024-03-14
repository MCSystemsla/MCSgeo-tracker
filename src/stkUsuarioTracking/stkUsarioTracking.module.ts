import { Global, Module } from '@nestjs/common';
import { stkUsuarioTrackingResolver } from './api/resolvers/stkUsuarioTracking.resolver';
import { stkUsuarioTrackingService } from './api/services/stkUsuarioTracking.service';

@Global()
@Module({
  controllers: [],
  providers: [stkUsuarioTrackingResolver, stkUsuarioTrackingService],
  exports: [stkUsuarioTrackingService],
})
export class stkUsuarioTrackingModule {}
