import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SetHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): any {
        const res = context.switchToHttp().getResponse<Response>();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        res.setHeader('Content-Type', fileType);
        res.setHeader('Content-Disposition', 'attachment; filename=SpeechScript.xlsx');
        res.type('application/octet-stream');
        return next.handle();
    }
}