const express = require("express");
let app = express.Router();
const Management = require("../models/management");
const bcrypt = require("bcryptjs");


// get all managers
app.get("/mngts/all", async(req, res)=>{
    let mngts;
    try {
      mngts = await Management.find();
    } catch (error) {
    res.status(500).json({error: err.message})
    }
     if(!mngts){
       return res.status(404).json("Manager not found")
     }
     return res.status(200).json(mngts)
   });


// get a single manager
app.get("/mngt/:id", async (req, res) => {

    let mngt;
    try {
       mngt = await Management.findById(req.params.id);
    } catch (error) {
       console.log(error)
    }
    if (!mngt) {
       return res.status(400).json("You are not a Manager")
    }
    return res.status(200).json(mngt)
  });

// update a manager
   app.put("/mngt/:id", async (req, res) => {
    const { fullname, branch_id, role, } = req.body;
    const mngtId = req.params.id;
    let mngt;
    try {
       mngt= await Management.findByIdAndUpdate(mngtId, {
          $set: req.body
       }, {new:true});
    } catch (error) {
       console.log(error)
    }
    if (!mngt) {
       return res.status(500).json({ msg: "Unable to Update manager.", code: 500 })
    }
    return res.status(200).json(mngt);
  });


// delete a manager

app.delete("/mngt/:id", async (req, res) => {
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


  // create a manager
    app.post("/mngt", async(req, res)=>{

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            const newUser = new Management({
                fullname: req.body.fullname,
                role: req.body.role,
                password: hashedPassword,
                branch_id:req.body.branch_id,
                
                });
            const user = await newUser.save();
            res.status(200).json("Manager Created")
        } catch (error) {
          res.status(500).json(error)  
        }
        });


module.exports = app