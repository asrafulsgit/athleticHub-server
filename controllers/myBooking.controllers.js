const MyBooking = require('../models/myBooking.model');

// create booking
const createBooking = async (req, res) => {
  const {id} = req.params;
  const {email,phone}= req.body;
  try {
    if (!email || !id) {
      return res.status(400).json({
        success: false,
        message: 'email and id are required.'
      });
    }
    const isBooked = await MyBooking.findOne({event : id, userEmail : email})
    if(isBooked){
    return res.status(400).send({
        message: "You have already booked this Event!",
        success : false
      });
    }
    const newBooking = new MyBooking({
      userEmail : email,
      event : id,
      phone
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      event: savedBooking
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while booking',
      error: error.message
    });
  }
};

// my bookings
const myBookings = async (req, res) => {
  const { email } = req.user;
  try {
    if (!email) {
      return res.status(400).send({
        message: "Email is required.",
        success: false,
      });
    }
    const bookings = await MyBooking.find({ userEmail : email }).populate('event').sort({
      createdAt: -1,
    });
    
    return res.status(200).send({
      message: "my bookings fetched",
      events : bookings,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// cencel bookings
const cencelBooking = async (req, res) => {
   const {email} = req.user;
   const {id}= req.params;
  try {
    if (!id) {
      return res.status(400).send({
        message: "id is required.",
        success: false,
      });
    }

    await MyBooking.findOneAndDelete({event : id, userEmail : email});

    return res.status(200).send({
      message: "Booking cenceled",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// my bookings
const myBookingsIds = async (req, res) => {
  const { email } = req.user;
  try {
    if (!email) {
      return res.status(400).send({
        message: "Email is required.",
        success: false,
      });
    }
    const bookings = await MyBooking.find({ userEmail : email }).populate('event',"_id");

   const bookingsIds = bookings
    .map((book) => book.event?._id)
    .filter((id) => id !== undefined);

    return res.status(200).send({
      message: "Book events ids fetched",
      events : bookingsIds,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};




module.exports = { 
    createBooking,
    myBookings,
    cencelBooking,
    myBookingsIds
};






