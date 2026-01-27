import { prisma } from "../lib/prisma.js";

export const renderFileList = async (req, res) => {
  try {
    const folderId = Number(req.params.id);
    const { id } = req.user;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: id,
      },
    });
    if (!folder) {
      return res.status(404).send("Folder not found");
    }
    const files = await prisma.file.findMany({
      where: { folderId: folderId, userId: id },
      orderBy: { createdAt: "desc" },
    });
    res.render("fileList", { files: files, folderId: folderId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const renderFileForm = async (req, res) => {
  try {
    const folderId = Number(req.params.id);
    res.render("fileForm", { folderId: folderId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createFile = async (req, res) => {
  try {
    const folderId = Number(req.params.id);
    const { id } = req.user;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: id,
      },
    });
    if (!folder) {
      return res.status(404).send("Folder not found");
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const { originalname, size, path: filePath } = req.file;
    await prisma.file.create({
      data: {
        name: originalname,
        size: size,
        path: filePath,
        userId: id,
        folderId: folderId,
      },
    });
    res.redirect(`/folders/${folderId}/files`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileId = Number(req.params.id);
    const { id } = req.user;
    const file = await prisma.file.findFirst({
      where: { id: fileId, userId: id },
    });
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.download(file.path, file.name);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
