import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

/**
 * Service for sending email
 * @class EmailService
 */
@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) {}

  /**
   * @param to - { string | list string } the recepient email address
   * @param subject - { string | list string } the subject of the email
   * @param body - { string | html } the body of the email
   * @param cc - { string | list string } [optionalParam] the recepient email cc address
   * @param bcc - { string | list string } [optionalParam] the recepient email bcc address
   * @returns Promise<any>
   * @returns {boolean} status
   * @returns {any} detail - detail response from provider
   * @throws {Error} httpException
   */

  async send(
    to: string,
    subject: string,
    body: string,
    cc: string,
    bcc: string,
    attachments: any
  ): Promise<any> {
    if (!to) throw new Error('Email to is required');
    if (!subject) throw new Error('email subject is required');
    if (!body) throw new Error('email body is required');
    const params = {
      to,
      cc,
      bcc,
      subject,
      html: body,
      attachments,
    };
    try {
      await this.mailerService.sendMail(params);
      return { status: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          error_code: 99,
          message: error
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
