import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;

      const jwt = request.headers.authorization.split(' ')[1];

      const decoded = this.jwtService.verify(jwt);
      console.log('decodeeeeeeeeeed', decoded);
      if (!decoded) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
