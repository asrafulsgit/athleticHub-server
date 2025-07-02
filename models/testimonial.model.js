const mongoose= require("mongoose")

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
