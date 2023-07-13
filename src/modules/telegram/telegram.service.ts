import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
    private readonly bot: any;
    private readonly configService: ConfigService
    constructor() {
        this.bot = new TelegramBot(this.configService.get('TOKEN_TELEGRAM'), {polling: true});
        this.bot.on('message', this.onReceiveMessage)
    }

    onReceiveMessage = (msg: string) => {
        
    }
}