const Testimonial = require('../models/testimonial.model');

// ✅ Create a testimonial
 const createTestimonial = async (req, res) => {
  try {
    const { name, role, text, rating, image } = req.body;

    const testimonial = new Testimonial({
      name,
      role,
      text,
      rating,
      image,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating testimonial." });
  }
};

// ✅ Get all testimonials
 const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).send({
        message : 'Testimonials Fetched',
        success : true,
        testimonials
    });
  } catch (error) {
    res.status(500).json({ 
        message: "Server error while fetching testimonials.",
        success : false
    });
  }
};

// ✅ Get a single testimonial by ID
 const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching testimonial." });
  }
};

// ✅ Update a testimonial by ID
 const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, text, rating, image } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, role, text, rating, image },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating testimonial." });
  }
};

// ✅ Delete a testimonial by ID
 const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res.json({ message: "Testimonial deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting testimonial." });
  }
};

module.exports={
    getAllTestimonials
}