import nodemailer = require("nodemailer")

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
   
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'jfgutierrezsaico@gmail.com', // generated ethereal user
      pass: 'vtzqvkeariewskwe', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
  }
})

transporter.verify().then(()=>{
    console.log('ready for send mail');
    
});