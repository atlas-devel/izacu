export const changePassword = (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Password and email are required" });
  }
    
};
