import express from "express";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { sessionMiddleware } from "./lib/session.js";
import { initializeLocalStrategy } from "./lib/passport.js";
import { homepageRouter } from "./routes/homepageRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(sessionMiddleware);

initializeLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.appTitle = "Odin File Uploader";
  res.locals.currentPath = req.path;
  res.locals.errors = [];
  res.locals.oldInput = [];
  next();
});

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", homepageRouter);
app.use("/users", userRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Express App launched successfully! Server running on port ${PORT}.`);
});
