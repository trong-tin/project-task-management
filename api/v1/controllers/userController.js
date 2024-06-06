const md5 = require("md5");
const User = require("../models/userModel");

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
