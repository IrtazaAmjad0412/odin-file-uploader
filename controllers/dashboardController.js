import { prisma } from "../lib/prisma.js";

export const renderDashboard = async (req, res) => {
  try {
    const { id } = req.user;
    const folders = await prisma.folder.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.render("dashboard", {
      folders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
