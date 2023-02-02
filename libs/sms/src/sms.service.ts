import { HttpCode, Injectable } from '@nestjs/common';
import { createSMSAdapter } from './adapters/factory.adapter';

@Injectable()
/**
 * Service for sending sms
 * @class SmsService
 */
export class SmsService {

  /** sms adapter to use for sending sms */
  private adapter: any;

  /** sms provider {string} set sms provider in environment file (.env) using OTP_PROVIDER */
  private provider: string = process.env.OTP_PROVIDER;
  
  /** sms apiKey {string} set apiKey from provider in environment file (.env) using OTP_APIKEY */
  private apiKey: string = process.env.OTP_APIKEY;
  
  /** sms apiSecret {string} set apiSecret from provider in environment file (.env) using OTP_APISECRET */
  private apiSecret: string = process.env.OTP_APISECRET;
  
  /** sms from {string} set from/sender phone number from provider in environment file (.env) using OTP_FROM */
  private from: string = process.env.OTP_FROM;

  constructor() {
    /** create sms adapter from config */
    this.adapter = createSMSAdapter(
      this.provider,
      this.apiKey,
      this.apiSecret,
      this.from,
    );
  }

  /**
   * 
   * @param phoneNumber {string} - Phone number destination message
   * @param message {string} - string message. We can add otpcode to send otp message in message parameter
   * @returns Promise <any>
   */
  @HttpCode(200)
  async sendSMS(phoneNumber: string, message: string): Promise<any> {
    return this.adapter.sendSMS(phoneNumber, message);
  }
}
