# Module Utils
Module utils are a collection of modules or services that handle certain tasks and can be used in other modules or services that require such as:
- Sending email
- Sending SMS/OTP

## Module Mailer
We can use this module for sending email (email relay), using both the SMPT standard protocol and email service providers such as: mailgun, sendgrid, mailgun, sendinblue and mailtrap.

By using this module/service, all we have to do is configure the credentials for the project's environment variables as follows:

```
# PROVIDER SUPPORT [mailtrap, sendinblue, mailgun, sendgrid, and standard smtp protocol]
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```
After defining the credentials in the environment variables, the next step is that we can use this service/module by injecting (DI) it into another service or controller that needs it.

```
import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {

  constructor(private readonly mailService: EmailService) {}

  sendMail(options: any) {
    return this.mailService.send(options);
  }
}

```
in the options parameter, there is a minimum attribute that must be set, including:
```
{
  to: <email destination | string or array string[] for multiple recepient>,
  subject: <email subject | string>,
  body: <email body bisa berupa text/html>
}
```
Besides that, there are several attributes that we can use (optional), including:
```
{
  ...
  cc: <email cc | string or array string>,
  bcc: <email bcc | string or array string>,
  attachments: <email attachment | list object filename, path>
}
```
### Module Dependency
```
@nestjs-modules/mailer
@nestjs/config
```

## SMS Module
This module or service allows us to send SMS or OTP by using a Citcall or Twilio provider. As before, to use this service we only need to call it on the service application or module that needs it:

```
```

## Author
- sabbanaait <mailto: sabbana.azmi@akarinti.tech>
