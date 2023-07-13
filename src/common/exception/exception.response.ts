import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import {  Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.message;
        console.error('Exception thrown', exception);
        response.status(status).json({message, statusCode: status, time: Date.now()})
    }
}
