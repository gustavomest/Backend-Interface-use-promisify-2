const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const serviceRoutes = require("./routes/serviceRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(serviceRoutes);

// Middleware de erro
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
