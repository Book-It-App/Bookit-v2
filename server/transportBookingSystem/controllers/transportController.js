const Transport = require('../model/transportSchema');
const User = require("../../authService/model/userSchema");

const createTransport = async (req, res, next) => {
  try {
    const { name, location, capacity,amenities,description,hallCreater } = req.body;

    if (!name || !location || !capacity || !amenities || !description || !hallCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }

    if (capacity <= 0) {
      return res.status(422).json({ error: "Please enter a valid capacity greater than zero" });
    }
    const hall = new Transport({ name, location, capacity,amenities,description,hallCreater });
    await hall.save();
    res.status(201).json({ message: 'Hall created successfully' });
  } catch (error) {
    next(error);
  }
};

const getTransports = async (req, res, next) => {
  try {
    const halls = await Transport.find();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

const getTransportById = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Transport.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ hall });
  } catch (error) {
    next(error);
  }
};

const updateTransport = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const { name, location, capacity ,amenities,description} = req.body;
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;
    const hall = await Transport.findById(hallId);

    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    if (hall.hallCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
    // if (hall.hallCreater !== hallCreatorEmail) {
      return res.status(403).json({ message: 'Unauthorized' }); // 403 means "Forbidden"
    }

    const updatedHall = await Transport.findByIdAndUpdate(
      hallId,
      { name, location, capacity, amenities, description },
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    res.json({ hall: updatedHall });
  } catch (error) {
    next(error);
  }
};

const deleteTransport = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Transport.findByIdAndDelete(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTransport, getTransports, getTransportById, updateTransport, deleteTransport };
