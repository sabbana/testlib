import { Injectable } from '@nestjs/common';
import { EmailService } from '@ait/nestjs-notification/email';
import { SmsService } from '@ait/nestjs-notification/sms';

@Injectable()
export class AppService {

  constructor(private readonly mailService: EmailService, private readonly smsService: SmsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(options: any) {
    return this.mailService.send(options.to, options.subject, options.body, options.cc, options.bcc, options.attachments)
  }

  sendSms(phoneNumber: string, message: string) {
    return this.smsService.sendSMS(phoneNumber, message);
  }
}
