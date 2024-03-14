import { stkUsuarioTrackingService } from 'src/stkUsuarioTracking/api/services/stkUsuarioTracking.service';
import { LoginInput } from '../models/auth.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private stkUsuarioTrackingService: stkUsuarioTrackingService) {}

  async signIn(input: LoginInput) {
    console.log(input.clave);
    const usuarios =
      await this.stkUsuarioTrackingService.solicitarUsuarioTracking(
        input.usuario,
      );
  }
}
