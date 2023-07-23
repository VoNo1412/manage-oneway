import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        console.log("this is exception: ", exception);
        const status = typeof exception?.getStatus === 'function' ? exception?.getStatus() : exception?.response?.statusCode || exception.message;
        const message = exception.message;
        console.error('Exception thrown', exception);
        response.status(status).json({ message, data: null, statusCode: status })
    }
}
