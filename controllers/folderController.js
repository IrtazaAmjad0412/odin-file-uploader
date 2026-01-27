import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";

export const renderFolderForm = (req, res) => {
  try {
    res.render("folderForm");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("folderForm", {
        errors: errors.mapped(),
        oldInput: req.body,
      });
    }
    await prisma.folder.create({
      data: {
        name: name,
        userId: id,
      },
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const renderEditFolderForm = async (req, res) => {
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
    res.render("editFolderForm", { folder: folder });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const editFolder = async (req, res) => {
  try {
    const folderId = Number(req.params.id);
    const { id } = req.user;
    const { name } = req.body;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: id,
      },
    });
    if (!folder) {
      return res.status(404).send("Folder not found");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("editFolderForm", {
        errors: errors.mapped(),
        oldInput: req.body,
        folder: folder,
      });
    }
    await prisma.folder.update({
      where: { id: folderId },
      data: { name },
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteFolder = async (req, res) => {
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
    await prisma.folder.delete({
      where: { id: folderId },
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
