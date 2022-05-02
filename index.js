const express = require("express");
const bodyParser = require('body-parser');
const pictureRoutes = require("./routes/picturesRoute")

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:8020'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use("/pictures", pictureRoutes)
app.get("/" , (req, res) => {
  res.send("this is home page")
})


app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${PORT}`);
});
