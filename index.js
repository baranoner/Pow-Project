import express from "express"
import bodyParser from "body-parser"
import axios from "axios"


const app = express();
const port = 3000;
const API_KEY = "1a782afd5e4090ae5aed23a8e0309967";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.post("/submit", async (req, res) => {
  try {
    console.log(req.body);
    const heroName = req.body.heroName;
    const response = await axios.get(
      `https://superheroapi.com/api/${API_KEY}/search/${heroName}`
    );
    const result = response.data;
    console.log(result);
    if(result.response === "success")
    {
        res.render("info.ejs", {
          data: result.results,
        });
    }
    else{
        res.render("home.ejs", {
        error: result.error,
    });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("home.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});