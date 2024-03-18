import { stkUsuarioTrackingService } from 'src/stkUsuarioTracking/api/services/stkUsuarioTracking.service';
import { LoginInput } from '../models/auth.input';
import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private stkUsuarioTrackingService: stkUsuarioTrackingService,
    private JwtService: JwtService,
  ) {}

  async login(input: LoginInput) {
    const usuario =
      await this.stkUsuarioTrackingService.solicitarUsuarioTracking(
        input.usuario,
      );

    if ('errorName' in usuario) {
      return 'error llamando al usuario';
    }

    if (bcrypt.compareSync(input.clave, usuario.clave)) {
      console.log('login exitoso');
      const payload = { sub: usuario.id, email: usuario.email };
      const jwt = await this.JwtService.sign(payload);

      return {
        accessToken: jwt,
      };
    } else {
      console.log('login fallido');
      return 'login fallido';
    }
  }
}
