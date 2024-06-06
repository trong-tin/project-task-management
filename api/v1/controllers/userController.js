const md5 = require("md5");
const User = require("../models/userModel");
const ForgotPassword = require("../models/forgotPasswordModel");
const generateHelper = require("../../../helpers/generate");
const sendEmailHelper = require("../../../helpers/sendMail");
// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại",
      });
    } else {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      });
      user.save();
      const token = user.token;
      res.cookie("token", token);
      res.json({
        code: 200,
        message: "Đăng kí thành công",
        token: token,
      });
    }
  } catch {
    res.json({
      code: 400,
      message: "Lỗi 404",
    });
  }
};

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      req.body.password = md5(req.body.password);
      if (req.body.password === existEmail.password) {
        res.json({
          code: 200,
          message: "Đăng nhập thành công",
          token: existEmail.token,
        });
      } else {
        res.json({
          code: 400,
          message: "Sai mật khẩu",
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Email đăng nhập không đúng",
      });
    }
  } catch {
    res.json({
      code: 400,
      message: "Lỗi 404",
    });
  }
};

// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const existEmail = await User.findOne({
    email: email,
    deleted: false,
  });
  if (existEmail) {
    const otp = generateHelper.generateRandomNumber(8);
    const timeExpire = 5;
    const objectForgotPassword = {
      email,
      otp,
      expireAt: Date.now() + timeExpire * 60,
    };
    const forgotPassword = await new ForgotPassword(objectForgotPassword);
    forgotPassword.save();

    // SEND OTP to USER
    const subject = `Xác Minh Tài Khoản: Mã OTP Cho Việc Đổi Mật Khẩu`;
    const html = `
                  <div style="max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333; font-weight: bold;">Thông Tin Xác Minh Tài Khoản</h1>
                    <p style="color: #666;">Xin chào,</p>
                    <p style="color: #666;">Để tiếp tục quá trình thay đổi mật khẩu của bạn, vui lòng sử dụng mã OTP sau đây:</p>
                    <div style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin-bottom: 20px;">
                        <p style="font-size: 18px; color: #333; margin: 0;">Mã OTP: <strong style="color: #0000ff;">${otp}</strong></p>
                    </div>
                    <p style="color: #666;">Lưu ý: Mã OTP này sẽ hết hạn trong vòng ${timeExpire} phút. Vui lòng không chia sẻ mã này với bất kỳ ai khác.</p>
                    <p style="color: #666;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
                    <p style="color: #666;">Trân trọng,</p>
                    <p style="color: #666;"><em>Tổ Điều Hành Bảo Mật</em></p>
                  </div>`;
    sendEmailHelper.sendMail(email, subject, html);
    res.json({
      code: 200,
      data: objectForgotPassword,
    });
  }
  if (!existEmail) {
    res.json({
      code: 400,
      message: "Email không tồn tại",
    });
  }
};

// [POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!result) {
    res.json({
      code: 400,
      message: "Mã OTP không chính xác",
    });
    return;
  }
  const user = await User.findOne({ email: email });
  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Xác thực thành công",
    token: token,
  });
};

// [POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = md5(req.body.password);
  const user = await User.findOne({
    token: token,
  });
  if (user.password === password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu khác với mật khẩu cũ",
    });
    return;
  }
  await User.updateOne(
    {
      email: user.email,
    },
    { password: password }
  );
  res.json({
    code: 200,
    message: "Thay đổi mật khẩu thành công",
  });
};
