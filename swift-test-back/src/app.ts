import express from "express";
import cors from "cors";
import userRoute from "./routes/user-routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

const PORT = 8002;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
