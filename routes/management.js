const express = require("express");
let app = express.Router();
const Management = require("../models/management");
const bcrypt = require("bcryptjs");

<<<<<<< HEAD
// get all managers
=======
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
app.get("/all", async (req, res) => {
  let mngts = [];
  let { branch_id, cinema_id } = req.query;
  try {
<<<<<<< HEAD
    if (branch_id) mngts = await Management.find({ branch_id }).select("-password");
    else if (cinema_id) mngts = await Management.find({ cinema_id }).select("-password");
    else  mngts = await Management.find({ cinema_id,branch_id }).select("-password");

  } catch (err) {
    res.status(500).json({ err: err.message })
  }
  if (!mngts.length) {
    return res.status(200).json(mngts)
  }
  return res.status(200).json(mngts)
=======
    if (branch_id)
      mngts = await Management.find({ branch_id }).select("-password");
    else if (cinema_id)
      mngts = await Management.find({ cinema_id }).select("-password");
    else
      mngts = await Management.find({ cinema_id, branch_id }).select(
        "-password"
      );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
  if (!mngts.length) {
    return res.status(200).json(mngts);
  }
  return res.status(200).json(mngts);
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
});

// get a single manager
app.get("/:id", async (req, res) => {
<<<<<<< HEAD

=======
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
  let mngt;
  try {
    mngt = await Management.findById(req.params.id).select("-password");
  } catch (error) {
<<<<<<< HEAD
    console.log(error)
  }
  if (!mngt) {
    return res.status(400).json("You are not a Manager")
  }
  return res.status(200).json(mngt)
=======
    console.log(error);
  }
  if (!mngt) {
    return res.status(400).json("You are not a Manager");
  }
  return res.status(200).json(mngt);
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
});

// create a manager
app.post("/", async (req, res) => {
<<<<<<< HEAD

=======
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new Management({
      fullname: req.body.fullname,
      role: req.body.role,
      password: hashedPassword,
<<<<<<< HEAD
      cinema_id:req.body.cinema_id,
      phone:req.body.phone,
      email:req.body.email,
      branch_id: req.body.branch_id,

    });
    const user = await newUser.save();
    res.status(200).json({msg:"Manager Created",data:user})
  } catch (error) {
    res.status(500).json(error)
=======
      cinema_id: req.body.cinema_id,
      phone: req.body.phone,
      email: req.body.email,
      branch_id: req.body.branch_id,
    });
    const user = await newUser.save();
    res.status(200).json({ msg: "Manager Created", data: user });
  } catch (error) {
    res.status(500).json(error);
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
  }
});

// update a manager
app.put("/:id", async (req, res) => {
<<<<<<< HEAD
  const { fullname, branch_id, role, } = req.body;
  const mngtId = req.params.id;
  let mngt;
  try {
    mngt = await Management.findByIdAndUpdate(mngtId, {
      $set: req.body
    }, { new: true });
  } catch (error) {
    console.log(error)
  }
  if (!mngt) {
    return res.status(500).json({ msg: "Unable to Update manager.", code: 500 })
=======
  const { fullname, branch_id, role } = req.body;
  const mngtId = req.params.id;
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
>>>>>>> 3434790f00cfb32bc045372007d5d4471d4291cd
  }
  return res.status(200).json(mngt);
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
