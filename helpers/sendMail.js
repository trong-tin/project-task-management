// khai báo sử dụng module nodemailer
const nodemailer = require("nodemailer");
module.exports.sendMail = (mail, subject, html) => {
  const transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: process.env.EMAIL_USER,
    to: mail,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
};


//PS (Xem hướng dẫn làm email để dùng email đó gửi mã otp cho user ở video Bài:48 tại 1 tiếng 7p)