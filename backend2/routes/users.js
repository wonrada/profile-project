const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.js");

const multer = require("multer");
const upload = multer({ dest: "temp/" });
const fs = require("fs");

const bucketName = "wonrada-bugket";

router.post("/", (req, res, next) => {
  User.create({
    userInfo: req.body.userInfo,
    contactInfo: req.body.contactInfo,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Create Error!", message: "Failed to Create User" });
    });
});

router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Get User Error!", message: "Failed to Get User" });
    });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Get User Error!", message: "Failed to Get User" });
    });
});

router.put("/:id", (req, res, next) => {
  let updateFields = {
    userInfo: req.body.userInfo,
    contactInfo: req.body.contactInfo,
  };
  
  if (req.body.educationInfo) {
    updateFields.$push = { educationInfo: { $each: req.body.educationInfo } };
  }
  if (req.body.jobExperienceInfo) {
    updateFields.$push = { jobExperienceInfo: { $each: req.body.jobExperienceInfo } };
  }
  if (req.body.skillInfo) {
    updateFields.$push = { skillInfo: { $each: req.body.skillInfo } };
  }
  if (req.body.interestInfo) {
    updateFields.$push = { interestInfo: { $each: req.body.interestInfo } };
  }
  if (req.body.guildInfo) {
    updateFields.$push = { guildInfo: { $each: req.body.guildInfo } };
  }
  User.findByIdAndUpdate(req.params.id, updateFields)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Update User Error!",
        message: "Failed to Update User",
      });
    });
});

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Delete User Error!",
        message: "Failed to Delete User",
      });
    });
});

router.delete("/info/:id", (req, res, next) => {
  let deleteField = {};
  
  if ( req.body.field == "education") {
    deleteField.$pull= { educationInfo: { _id: req.body.id }};
  }
  if (req.body.field == "experience") {
    deleteField.$pull= { jobExperienceInfo: { _id: req.body.id }};
  }
  if (req.body.field == "skill") {
    deleteField.$pull= { skillInfo: { _id: req.body.id }};
  }
  if (req.body.field == "interest") {
    deleteField.$pull= { interestInfo: { _id: req.body.id }};
  }
  if (req.body.field == "guild") {
    deleteField.$pull= { guildInfo: { _id: req.body.id }};
  }
  User.findByIdAndUpdate(req.params.id, deleteField)
    .then((result) => {
      res.status(204).json();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Delete User Error!",
        message: "Failed to Delete User",
      });
    });
});

router.put(
  "/upload-profile-image/:id",
  upload.single("file"),
  (req, res, next) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const filePath = req.file.path;
    const fileName =
      "profile" + day + month + year + hours + minutes + seconds + ".jpg";

    let imgUrl = "";
    // อัปโหลดไฟล์ไปยัง Minio
    minioClient.fPutObject(bucketName, fileName, filePath, (err, etag) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to upload file to Minio" });
      }

      // ลบไฟล์ชั่วคราวหลังจากอัปโหลดเสร็จ
      fs.unlinkSync(filePath);

      // สร้าง URL สำหรับไฟล์ที่อัปโหลดขึ้น
      imgUrl =
        minioClient.protocol +
        "//" +
        minioClient.host +
        ":" +
        minioClient.port +
        "/" +
        bucketName +
        "/" +
        fileName;

      User.findByIdAndUpdate(
        req.params.id,
        { profileImgUrl: imgUrl },
        { new: true }
      )
        .then((result) => {
          res.status(200).json({ profileImgUrl: imgUrl });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Update User Error!",
            message: "Failed to Update User",
          });
        });
    });
  }
);

router.put(
  "/upload-cover-image/:id",
  upload.single("file"),
  (req, res, next) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const filePath = req.file.path;
    const fileName =
      "cover" + day + month + year + hours + minutes + seconds + ".jpg";

    let imgUrl = "";
    // อัปโหลดไฟล์ไปยัง Minio
    minioClient.fPutObject(bucketName, fileName, filePath, (err, etag) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to upload file to Minio" });
      }

      // ลบไฟล์ชั่วคราวหลังจากอัปโหลดเสร็จ
      fs.unlinkSync(filePath);

      // สร้าง URL สำหรับไฟล์ที่อัปโหลดขึ้น
      imgUrl =
        minioClient.protocol +
        "//" +
        minioClient.host +
        ":" +
        minioClient.port +
        "/" +
        bucketName +
        "/" +
        fileName;

      User.findByIdAndUpdate(
        req.params.id,
        { coverImgUrl: imgUrl },
        { new: true }
      )
        .then((result) => {
          res.status(200).json({ coverImgUrl: imgUrl });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Update User Error!",
            message: "Failed to Update User",
          });
        });
    });
  }
);

module.exports = router;
