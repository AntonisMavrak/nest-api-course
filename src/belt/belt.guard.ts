import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check if the request body contains the belt property
    // const hasBlackBelt = request.user.belts.includes('black');
    //
    // return hasBlackBelt;
    return true;
  }
}
