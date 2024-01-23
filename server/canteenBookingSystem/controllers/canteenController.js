const Canteen = require('../model/canteenSchema');
const User = require("../../authService/model/userSchema");
const fs = require('fs'); // Import the Node.js file system module

const createCanteen = async (req, res, next) => {
  try {
    console.log(req.body);
    const file = req.file;
    console.log(file);
    const { name, canteenCreater } = req.body;
    const photo = file ? file.path : ''; // Change 'file.path' to the correct path attribute
    console.log(photo);
    if (!name || !canteenCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }



    const canteenExist = await Canteen.findOne({ name: name });

    if (canteenExist) {
      return res.status(422).json({ error: `Menu Item ${name} already exists` });
    }


    



    const canteen = new Canteen({ name,photo,canteenCreater });
    await canteen.save();
    res.status(201).json({ message: 'Menu Item created successfully' });
  } catch (error) {
    next(error);
  }
};

const getCanteens = async (req, res, next) => {
  try {
    const canteens = await Canteen.find();
    res.json({ canteens });
  } catch (error) {
    next(error);
  }
};

const getCanteenById = async (req, res, next) => {
  try {
    const { canteenId } = req.params;
    const canteen = await Canteen.findById(canteenId);
    if (!canteen) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }
    res.json({ canteen });
  } catch (error) {
    next(error);
  }
};

const updateCanteen = async (req, res, next) => {
  try {
    console.log("thisis update");
    console.log(req.body);
    const { canteenId } = req.params;
    const file = req.file;
    console.log(file);
    const { name, number, capacity ,photo} = req.body;
    const newPhoto = file ? file.path : ''; 
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;
    const canteen = await Canteen.findById(canteenId);

    if (!canteen) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }

    if (canteen.canteenCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
    // if (canteen.canteenCreater !== canteenCreatorEmail) {
      return res.status(403).json({ message: 'Unauthorized' }); // 403 means "Forbidden"
    }

    if (file && canteen.photo !== newPhoto) {
      // Remove existing photo
      fs.unlink(canteen.photo, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }


    const updatedCanteen = await Canteen.findByIdAndUpdate(
      canteenId,
      { name, photo: file ? newPhoto : photo },
      { new: true }
    );

    if (!updatedCanteen) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }

    res.json({ canteen: updatedCanteen });
  } catch (error) {
    next(error);
  }
};

const deleteCanteen = async (req, res, next) => {
  try {
    const { canteenId } = req.params;

    const canteen = await Canteen.findByIdAndDelete(canteenId);
    if (canteen.photo) {
      fs.unlink(canteen.photo, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (!canteen) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }


    res.json({ message: 'Menu Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCanteen, getCanteens, getCanteenById, updateCanteen, deleteCanteen };
