import config from 'config'
import nodemailer, { SendMailOptions } from 'nodemailer'
/* const createTestCredentials = async () => {
  const credentials = await nodemailer.createTestAccount()
  console.log(credentials);
}

createTestCredentials() */

const smtp = config.get<{
  user: string
  pass: string
  host: string
  port: number
  secure: boolean
}>('smtp')

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass
  }
})

const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if(err) {
      console.log(err, 'ERROR_SEND_EMAIL');
    } else {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  })
}

export default sendEmail