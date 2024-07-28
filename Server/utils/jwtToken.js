const sendToken = (user, statuscode, res) => {
  const token = user.getJwtToken();

  //cookies
  const options = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message:`welcome back,${user.name}`
  });
};

module.exports = sendToken;
