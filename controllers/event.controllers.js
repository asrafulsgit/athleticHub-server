const Event = require("../models/event.model");

const demoEvent = {
  _id: "665e5d4a6f5c9bcd123a0002",
  name: "Mountain Trail Marathon",
  type: "Marathon",
  date: "2025-09-15",
  time: "6:00 AM",
  location: "Bandarban Trails",
  fee: 20,
  description:
    "A thrilling 21km and 42km mountain trail run for serious endurance athletes.",
  image: "https://example.com/images/marathon.jpg",
  participants: 70,
  requirements: "Trail shoes, hydration pack, medical clearance",
  organizer: {
    image: "",
    name: "John Athlete",
    email: "john@athletichub.com",
  },
};

//create event
const createEvent = async (req, res) => {
  const {
    name,
    type,
    date,
    time,
    location,
    fee,
    description,
    image,
    participants,
    requirements,
    organizer,
    isOpen
  } = req.body; 
  try {
    if (
      !name.trim() ||
      !type ||
      !description.trim() ||
      !image ||
      !date ||
      !location ||
      !time ||
      !fee ||
      !organizer?.email.trim() ||
      !organizer?.name.trim()
    ) {
      return res.status(400).send({
        message: "All fields are required.",
        success: false,
      });
    }
    const newEvent = new Event({
      name,
      type,
      date,
      time,
      location,
      fee: Number(fee),
      description,
      image,
      participants: Number(participants),
      requirements,
      organizer,
      isOpen
    });

    await newEvent.save();
    
    return res.status(201).send({
      message: "Event successfully created.",
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
// event details
const eventDetails = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send({
        message: "id is required.",
        success: false,
      });
    }
    const event = await Event.findById(id);
    return res.status(200).send({
      message: "Event fetched",
      event,
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
// Updae event
const updateEvent = async (req, res) => {
  const {email} = req.user;
  const {
    name,
    type,
    date,
    time,
    location,
    fee,
    description,
    image,
    participants,
    requirements,
    organizer,
    isOpen
  } = req.body;
  if (
    !type ||
    !name.trim() ||
    !description.trim() ||
    !image ||
    !date ||
    !location.trim() ||
    !time ||
    !fee ||
    !organizer?.email.trim() ||
    !organizer?.name.trim()
  ) {
    return res.status(400).send({
      message: "All fields are required.",
      success: false,
    });
  }
  
  if(organizer.email !== email){
    return res.status(400).send({
      message: "Unauth user!",
      success: false,
    });
  }

  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).send({
        message: "id is required.",
        success: false,
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: id },
      {
        name,
        type,
        date,
        time,
        location,
        fee: Number(fee),
        description,
        image,
        participants: Number(participants),
        requirements,
        isOpen
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).send({
        message: "Event not found.",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Event successfully updated.",
      success: true,
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// all events for event page
const browseEvent = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.status(200).send({
      message: "Events fetched",
      events,
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

// featured events for lading page
const featuredEvents = async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); 
    const events = await Event.find({
      isOpen: true,
      $or: [
        { date: { $gt: today } },
        { date: today, time: { $gt: currentTime } }
      ]
    }).sort({ date: 1, time: 1 }).limit(6);
    
    return res.status(200).send({
      message: "Events fetched",
      events,
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

// delete event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).send({
        message: "id is required.",
        success: false,
      });
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Event deleted",
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

// filter Event
// const filterTips = async(req,res)=>{
//     const {level} = req.query;
//     try {

//         const levels = ['Easy', 'Medium', 'Hard']
//         if(!levels.includes(level)){
//             return res.status(400).send({
//             message: 'Wrong Input!',
//             success: false
//             })
//         }
//         const tips = await Tip.find({ difficulty : level,availability : 'Public'}).sort({createdAt : -1})
//         return res.status(200).send({
//             message: 'tips fetched',
//             tips,
//             success: false
//         });
//     } catch (error) {

//         return res.status(500).send({
//             message: 'Something broke!',
//             success: false,
//             error : error.message
//         });
//     }
// }

// my events organized by me
const myEvents = async (req, res) => {
  const { email } = req.user;
  try {
    if (!email) {
      return res.status(400).send({
        message: "Email is required.",
        success: false,
      });
    }
    const events = await Event.find({ "organizer.email": email }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      message: "Events fetched",
      events,
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


const filterEventsWithType = async(req,res)=>{
  const {eventType} = req.query; 
  try {
    if(!eventType){
      return res.status(404).send({ 
      success: false, 
      message: 'Event type is required!' 
    });
    }
    const events = await Event.find({type : eventType})
    return res.status(200).send({ 
      success: true, 
      events,
      message: 'Events filter successfull' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
}


const searchEvents = async(req,res)=>{ 
     try {
       const {search} = req.query;
       
       if(!search) {
        return res.status(404).send({ 
          success: false, 
          message: `Please enter event name!` 
        });
       }
  
       const events = await Event.find({ name : {$regex: search, $options: 'i'} })
       
       return res.status(200).send({ 
         success: true, 
         events,
         message: 'Search events successfull' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ 
        success: false, 
        message: "Something broke!" 
      });
     }
   }


const upcomingEvents = async (req, res) => {
  try {
    const now = new Date();

    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); 

    const events = await Event.find({
      isOpen: false,
      $or: [
        { date: { $gt: today } },
        { date: today, time: { $gt: currentTime } }
      ]
    }).sort({ date: 1, time: 1 }).limit(6);  

    return res.status(200).json({
      success: true,
      message: "Upcoming closed events fetched successfully.",
      events,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming closed events.",
      error: error.message,
    });
  }
};




module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  browseEvent,
  eventDetails,
  featuredEvents,
  myEvents,
  filterEventsWithType,
  searchEvents,
  upcomingEvents
};
