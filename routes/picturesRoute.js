const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", (req, res) => {
  axios(`http://www.bigtitsxxxpics.com`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];
      $(".prev.prev-2", html).each(function () {
        const title = $(this).find(".name").text();
        const url = $(this).find("a").attr("href");
        const img = $(this).find("img").attr("src");
        data.push({
          title,
          url,
          img,
        });
      });
      let finalData = data.filter((oneData) => {
        return oneData.title !== "ADV";
      });
      finalData.length != 0
        ? res.json(finalData)
        : res.json({ msg: "not found" });
    })
    .catch((err) => console.log(err));
});
router.post("/categories", (req, res) => {
  // return false
  axios(`http://www.bigtitsxxxpics.com/${req.body.cateName}/`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];
      $(".prev.prev-2", html).each(function () {
        const url = $(this).find("a").attr("href");
        const img = $(this).find("img").attr("src");
        data.push({
          url,
          img,
        });
      });
      data.length != 0 ? res.json(data) : res.json({ msg: "not found" });
    })
    .catch((err) => console.log(err));
});

router.post("/details", (req, res) => {
  const reqUrl = req.body.url;
  // return false
  axios(`http://www.bigtitsxxxpics.com${reqUrl}.html`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];
      $(".gal", html).each(function () {
        const img = $(this).find("a").attr("href");
        data.push({
          img,
        });
      });
      data.length != 0 ? res.json(data) : res.json({ msg: "not found" });
    })
    .catch((err) => console.log(err));
});

router.post("/search", (req, res) => {
  const reqQuery = req.body.query;
  // return false
  axios(`http://www.bigtitsxxxpics.com/search/${reqQuery}/`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const datas = [];
      $(".prev.prev-2", html).each(function () {
        const url = $(this).find("a").attr("href");
        const img = $(this).find("img").attr("src");
        datas.push({
          url,
          img,
        });
      });
      let finalData = datas.filter((singleData) => {
        return singleData.img !== undefined && singleData.url !== undefined;
      });
      finalData.length != 0
        ? res.json(finalData)
        : res.json({ msg: "not found" });
    })
    .catch((err) => console.log(err));
});


router.get("/populorSearchs", (req, res) => {
  axios(`http://www.bigtitsxxxpics.com`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const data = [];
      $(".links-list li", html).each(function () {
        const title = $(this).find("a").text();
        const url = $(this).find("a").attr("href");
        data.push({
          title,
          url,
        });
      });
      data.length != 0
        ? res.json(data)
        : res.json({ msg: "not found" });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
