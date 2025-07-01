const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.ibb.co/hRGTZWdX/download.jpg",
    },
    participants: {
      type: Number,
      default : 1,
      min : 1
    },
    requirements: {
      type: String,
    },
    isOpen : {
      type : Boolean,
      default : false
    },
    organizer: {
      image: {
        type: String,
        default: "https://i.ibb.co/hRGTZWdX/download.jpg",
        immutable: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        immutable: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
