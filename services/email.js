const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      product: {
        name: 'System Contacts',
        link: 'http://localhost:3000/',
      },
    });

    const tempalte = {
      body: {
        name: name,
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `http://localhost:3000/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(tempalte);
    return emailBody;
  }

  async sendEmail(verifyToken, email, name) {
    sgMail.setApiKey(process.env.SENDGRID_CONTACTS_API_KEY);
    console.log(verifyToken, email, name);
    const emailBody = this.#createTemplate(verifyToken, name);

    const msg = {
      to: email,
      from: 'snejana.pallada@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      html: emailBody,
    };

    await this.#sender
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch(error => {
        console.error(error);
      });
  }
}
module.exports = EmailService;
