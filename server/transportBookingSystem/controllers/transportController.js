const Transport = require('../model/transportSchema');
const User = require("../../authService/model/userSchema");
const fs = require('fs'); // Import the Node.js file system module

const createTransport = async (req, res, next) => {
  try {
    console.log(req.body);
    const file = req.file;
    console.log(file);
    const { name, number, capacity,transportCreater } = req.body;
    const photo = file ? file.path : ''; // Change 'file.path' to the correct path attribute
    console.log(photo);
    
    if (!name || !number || !capacity  || !transportCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }



    const transportExist = await Transport.findOne({ number: number });

    if (transportExist) {
      return res.status(422).json({ error: `Vehicle with this ${number} already exists` });
    }




    if (capacity <= 0) {
      return res.status(422).json({ error: "Please enter a valid capacity greater than zero" });
    }

    if (number.length !== 10) {
      return res.status(422).json({ error: "Please enter a valid vehicle number" });
    }
    



    const transport = new Transport({ name, number, capacity,photo,transportCreater });
    await transport.save();
    res.status(201).json({ message: 'Transport created successfully' });
  } catch (error) {
    next(error);
  }
};

const getTransports = async (req, res, next) => {
  try {
    const transports = await Transport.find();
    res.json({ transports });
  } catch (error) {
    next(error);
  }
};

const getTransportById = async (req, res, next) => {
  try {
    const { transportId } = req.params;
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }
    res.json({ transport });
  } catch (error) {
    next(error);
  }
};

const updateTransport = async (req, res, next) => {
  try {
    console.log("thisis update");
    console.log(req.body);
    const { transportId } = req.params;
    const file = req.file;
    console.log(file);
    const { name, number, capacity ,photo} = req.body;
    const newPhoto = file ? file.path : ''; 
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;
    const transport = await Transport.findById(transportId);

    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    if (transport.transportCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
    // if (transport.transportCreater !== transportCreatorEmail) {
      return res.status(403).json({ message: 'Unauthorized' }); // 403 means "Forbidden"
    }

    if (file && transport.photo !== newPhoto) {
      // Remove existing photo
      fs.unlink(transport.photo, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }


    const updatedTransport = await Transport.findByIdAndUpdate(
      transportId,
      { name, number, capacity, photo: file ? newPhoto : photo },
      { new: true }
    );

    if (!updatedTransport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.json({ transport: updatedTransport });
  } catch (error) {
    next(error);
  }
};

const deleteTransport = async (req, res, next) => {
  try {
    const { transportId } = req.params;

    const transport = await Transport.findByIdAndDelete(transportId);
    if (transport.photo) {
      fs.unlink(transport.photo, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }


    res.json({ message: 'Transport deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTransport, getTransports, getTransportById, updateTransport, deleteTransport };
