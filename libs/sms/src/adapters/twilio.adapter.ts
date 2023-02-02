import { HttpCode } from '@nestjs/common';
import axios from 'axios';

/**
 * Twilio adapter for sending sms
 */
export class TwilioAdapter {

  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;
  private from: string;

  constructor(apiKey: string, apiSecret: string, from: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.from = from;
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages.json`;
  }

  @HttpCode(200)
  async sendSMS(phoneNumber: string, message: string) {
    // set header authentification
    const config = {
      auth: {
        username: this.apiKey,
        password: this.apiSecret,
      },
    };
    // body parameter
    const data = new URLSearchParams({
      To: phoneNumber,
      Body: message,
      From: this.from,
    });

    try {
      await axios.post(this.baseUrl, data, config);
      return { status: true };
    } catch (error) {
      throw error;
    }
  }
}
