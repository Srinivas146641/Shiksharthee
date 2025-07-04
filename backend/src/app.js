import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ✅ Proper CORS config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import studentRouter from "./routes/student.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import courseRouter from "./routes/course.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRouter);

export { app };
