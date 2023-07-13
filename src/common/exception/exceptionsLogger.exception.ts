import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost, Catch } from "@nestjs/common"

@Catch()
export class ExceptionLoggerFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.error('Exception thrown', exception);
        super.catch(exception, host);
    }
}