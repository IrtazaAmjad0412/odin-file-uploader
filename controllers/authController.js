export const renderLoginForm = (req, res) => {
  try {
    res.render("loginForm");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
