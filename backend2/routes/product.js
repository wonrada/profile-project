const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.js");

router.get("/", (req, res, next) => {
  Product.find()
  .then(result => {
      console.log(result);
      res.json(result);
  })
  .catch(err => {
      console.error(err);
      // Handle error
  });
});

router.post("/", (req, res, next) => {
  Product.create(req.body)
  .then(result => {
      console.log(result);
      res.json(result);
  })
  .catch(err => {
      console.error(err);
      // Handle error
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
  .then(result => {
      console.log(result);
      res.json(result);
  })
  .catch(err => {
      console.error(err);
      // Handle error
  });
});

router.put("/:id", (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
  .then(result => {
      console.log(result);
      res.json(result);
  })
  .catch(err => {
      console.error(err);
      // Handle error
  });
});

router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
  .then(result => {
      console.log(result);
      res.json(result);
  })
  .catch(err => {
      console.error(err);
      // Handle error
  });
});

module.exports = router;
