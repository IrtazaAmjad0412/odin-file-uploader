export const renderHomepage = (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
