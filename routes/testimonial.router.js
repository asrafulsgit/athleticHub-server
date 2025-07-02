const express = require('express');
const userAuthentication = require('../middlewares/userAuth-middleware');
const { getAllTestimonials } = require('../controllers/testimonial.controllers');
const testimonialRouter = express.Router();



testimonialRouter.get('/testimonials',getAllTestimonials )

// https://i.ibb.co/KcVB8JhC/images-6.jpg
// https://i.ibb.co/KpCJBLvW/images-5.jpg
// https://i.ibb.co/Vp0pqfPc/images-4.jpg
// https://i.ibb.co/hJssRNBH/images-3.jpg
// https://i.ibb.co/Mx4kRZJW/images-2.jpg

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Marathon Runner",
//     text: "AthleticHub made it so easy to find and register for local races. The platform is intuitive and the event organization is top-notch!",
//     rating: 4,
//     image: "https://i.ibb.co/Mx4kRZJW/images-2.jpg",
//   },
//   {
//     name: "Mike Anderson",
//     role: "Cyclist",
//     text: "Thanks to AthleticHub, I discovered new cycling events in my area and improved my race times.",
//     rating: 5,
//     image: "https://i.ibb.co/hJssRNBH/images-3.jpg",
//   },
//   {
//     name: "Lisa Wong",
//     role: "Triathlete",
//     text: "The event details and registration process are super clear. I love tracking my progress through the platform.",
//     rating: 5,
//     image: "https://i.ibb.co/KpCJBLvW/images-5.jpg",
//   },
//   {
//     name: "David Kim",
//     role: "Soccer Player",
//     text: "Joining local tournaments was never easier. AthleticHub connects athletes with great events seamlessly.",
//     rating: 4,
//     image: "https://i.ibb.co/KcVB8JhC/images-6.jpg",
//   },
//   {
//     name: "Emily Carter",
//     role: "Swimmer",
//     text: "The community and event updates keep me motivated and informed. Highly recommended for all athletes.",
//     rating: 3,
//     image: "https://i.ibb.co/Vp0pqfPc/images-4.jpg",
//   }
// ];

// const Testimonial = require('../models/testimonial.model')

// const inserting =async()=>{
//    await Testimonial.insertMany(testimonials);
// }
// inserting()




module.exports = testimonialRouter;