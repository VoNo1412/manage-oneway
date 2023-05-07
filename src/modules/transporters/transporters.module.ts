import { Module } from "@nestjs/common";
import { MailModule } from "./email/mail.module";

@Module({
    imports: [MailModule]
})
export class TransporterModule {}