import { CallHandler, ClassSerializerInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class CustomerSerilization extends ClassSerializerInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(({data}) => {
            return {
                ...data,
                customers: data.customers.map(customer => ({ ...customer, name: customer.name + " devops" }))
            }
        }))
    }
}