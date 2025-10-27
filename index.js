import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import dotenv from "dotenv"


dotenv.config();
const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

var error = null;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", {
      error: error,
    });
})

app.post("/submit", async (req, res) => {
  try {
    const heroName = req.body.heroName.trim().toLowerCase();
    const response = await axios.get(
      `https://superheroapi.com/api/${API_KEY}/search/${heroName}`
    );
    const result = response.data;
    if(result.response === "success")
    {
        res.render("info.ejs", {
          data: result.results,
        });
    }
    else{
        error = result.error;
        res.redirect("/");
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    error = error.message;
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});