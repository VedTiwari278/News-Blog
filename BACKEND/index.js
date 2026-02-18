import dotenv from "dotenv";
import app from "./app.js";
import morgan from "morgan";
import { connectDB } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
app.use(morgan("dev"));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
