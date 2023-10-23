const express = require("express");
let app = express.Router();
const Management = require("../models/management");
const Cinema = require("../models/cinema");
const axios = require("axios");
const Email = require("../utils/email");
require("dotenv").config();
const { upload, handleUpload } = require("../utils/upload");

app.get("/", async (req, res) => {
  try {
    // let mngts = [];
    // const { cinema_id } = req.body;

    let cinema = await Cinema.findById(cinema_id);

    // if (branch)
    //   mngts = await Management.find({ branch_id: branch }).populate(
    //     "branch_id"
    //   );
    // else 
    if (!cinema)
    return res.status(404).send({ msg: "Cinema does not exist", code: 404 });

    let management = new Management(req.body);
    await management.save();
    res.send(management);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a single manager
app.get("/:id/user-info", async (req, res) => {
  let mngt;
  
  try {
    mngt = await Management.findById(req.params.id).populate("branch_id").select("-password");
  } catch (error) {
    console.log(error);
  }
  if (!mngt) {
    return res.status(400).json("You are not a Manager");
  }
  return res.status(200).json(mngt);

});

// create a manager
app.post("/register", async (req, res) => {
  try {
    const newUser = new Management({
      fullname: req.body.fullname,
      role: req.body.role,
      password: req.body.password,
      cinema_id: req.body.cinema_id,
      phone: req.body.phone,
      email: req.body.email,
      branch_id: req.body.branch_id,
    });
    const user = await newUser.save();
    
    // Remove password from the output
    let payload ={}
    payload.email = newUser.email;
    payload.name = newUser.fullname;
    payload.code = req.body.password;

    await new Email(payload, payload.code).sendSignupVerification();

    res.status(200).json({ msg: "Manager Created", data: user });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update a manager
app.put("/:id", async (req, res) => {
  const { fullname, branch_id, role } = req.body;
  const mngtId = req.params.id;
  req.body.image = undefined;
  let mngt;
  try {
    mngt = await Management.findByIdAndUpdate(
      mngtId,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (!mngt) {
    return res
      .status(500)
      .json({ msg: "Unable to Update manager.", code: 500 });
  }
  return res.status(200).json(mngt);
});

// Upload image for manager
app.put("/:id/resources", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const management = await Management.findById(id);

    if (!management) {
      return res
        .status(404)
        .json({ msg: "The id supplied does not exist", code: 404 });
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const data = await handleUpload(dataURI);

      management.image = data.url;
      await management.save();
      res.json({ msg: "Data saved", code: 200 });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "Server error has occurred" });
  }
});

// delete a manager

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mngt = await Management.findById(id);

    if (!mngt) {
      res.status(404).json({ msg: "Manager not found", code: 404 });
    } else {
      await mngt.deleteOne();
      res.status(200).json({ msg: "Manager deleted", code: 200 });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;
