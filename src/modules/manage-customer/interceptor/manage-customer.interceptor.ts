import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class CustomerSerilization implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => {
            return data.data.map(customer => ({...customer, name: customer.name + " devops"}))
        }))
    }
}