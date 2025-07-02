const Event = require("../models/event.model");
const MyBooking = require("../models/myBooking.model");
const Profile = require("../models/profile.model");
const User = require("../models/user.model");



const profile = async (req, res) => {
  const {id,email}=req.user;
 
  try {
    const profile = await Profile.findOne({user : id});
    
    // calculate participated 
    const myBookings = await MyBooking.find({userEmail : email}).populate('event','date time');

    let eventsPaticipated = 0;
    myBookings.forEach((booking)=>{
      const {date,time}= booking?.event;
      const dateTimeString = `${date} ${time}`;
      const eventDateTime = new Date(dateTimeString);
      const now = new Date(); 
      if(eventDateTime < now){
        eventsPaticipated++
      }
    })
    
    const events = await Event.find({'organizer.email' : email});
    let eventsOrganized = 0;
    let totalParticipants = 0;
    events.forEach((event)=>{
      const {date,time}=event;
      const dateTimeString = `${date} ${time}`;
      const eventDateTime = new Date(dateTimeString);
      const now = new Date();
      if(eventDateTime < now){
        eventsOrganized++
        totalParticipants += event.participants;
      }
    })
    
    return res.status(200).send({
      message: "Event successfully created.",
      profile,
      stats : {eventsPaticipated,eventsOrganized,totalParticipants},
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


const updateProfile = async (req, res) => {
  const {id}=req.user;
  const {
    name,
    email,
    avatar,
    experties,
    bio,
    phone,
    location,
    dob
  } = req.body; 

  try {
    const profile = await Profile.findOne({user : id});
    if(!profile){
        const createProfile = new Profile({
        user : id,
        experties,
        bio,
        phone,
        location,
        dob
        });
        await createProfile.save();
    }
    if(profile){
        profile.experties = experties,
        profile.bio=bio,
        profile.phone = phone,
        profile.location = location,
        profile.dob = dob

        await profile.save();
    }
    if(!name.trim()){
    return res.status(404).send({
        message: "Name is required!",
        success: false,
     });
    }
    
    await User.findOneAndUpdate({email},{name,avatar})
    
    return res.status(201).send({
      message: "Profile update successfull.",
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

module.exports ={
    profile,
    updateProfile
}