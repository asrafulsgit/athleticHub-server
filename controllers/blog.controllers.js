const Blog = require('../models/blog.model')

// Create a blog
 const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, image } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "A blog with this title already exists." });
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      author,
      image,
      slug,
    });

    await blog.save();
    return res.status(201).send({
        message : 'Blog posted',
        success : true,
        blog
    });
  } catch (error) {
    console.error("Create blog error:", error);
    return res.status(500).json({ 
        message: "Server error while creating blog.", 
        success : false
    });
  }
};

// Get all blogs
 const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")  
      .sort({ createdAt: -1 });
    return res.status(200).send({
        message : 'Blogs fatched',
        success : true,
        blogs
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    return res.status(500).json({ 
        message: "Server error while fetching blogs.",
        success : false
    });
  }
};

// Get a single blog by slug
 const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate("author", "name email");

    if (!blog) {
      return res.status(404).send({ 
        message: "Blog not found.",
        success: false
    });
    }

    return res.status(200).send({
        message : 'Blog fatched',
        success : true,
        blog
    });
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({ message: "Server error while fetching blog." });
  }
};

// Update a blog by slug
 const updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, excerpt, content, author, image } = req.body;

    const updatedSlug = title
      ? title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
      : slug;

    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        excerpt,
        content,
        author,
        image,
        slug: updatedSlug,
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.json(blog);
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: "Server error while updating blog." });
  }
};

// Delete a blog by slug
 const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error while deleting blog." });
  }
};

const blogDataArray =[
  {
    title: "Mastering Marathon Training: A Complete Guide",
    excerpt: "Everything you need to know about preparing for your first marathon, from training plans to recovery strategies.",
    content: "Running a marathon requires dedication, planning, and the right mindset. This guide will walk you through weekly mileage goals, nutrition essentials, and tapering before race day.Make sure you consult with a coach if you're new to long-distance running.",
    author: "684d2cd99820241aa73487a9",
    image: "https://i.ibb.co/Gv8RNvg7/Scenic-Carlsbad15800-large.jpg",
    slug: "mastering-marathon-training"
  },
  {
    title: "Top 7 Benefits of Joining a Local Running Club",
    excerpt: "Discover how a running club can help you stay motivated, meet new people, and improve your performance.",
    content: "Running clubs provide structured workouts, accountability, and camaraderie. You can find training partners, participate in group races, and get expert coaching advice.",
    author: "684db0d12b4b748503ab6066",
    image: "https://i.ibb.co/rfZRsbgK/Benefits-of-joining-a-running-club-1200x675.jpg",
    slug: "benefits-of-joining-running-club"
  },
  {
    title: "Essential Nutrition Tips for Endurance Athletes",
    excerpt: "Learn what to eat and drink before, during, and after your training sessions to fuel your performance.",
    content: "Carbohydrates are your main energy source during endurance sports. Make sure to hydrate regularly and consider electrolyte replacement on long runs. Recovery meals should include protein to rebuild muscle.",
    author: "684db1512b4b748503ab6069",
    image: "https://i.ibb.co/4RmmXvTS/issa-nutrition-endurance.jpg",
    slug: "nutrition-tips-for-endurance-athletes"
  },
  {
    title: "Preventing Common Running Injuries",
    excerpt: "Follow these expert strategies to keep your training on track and avoid setbacks.",
    content: "Proper warm-ups, strength training, and listening to your body are key. Don't increase your mileage by more than 10% per week to avoid overuse injuries like shin splints and plantar fasciitis.",
    author: "684e539c9bbfcc2bb49aa292",
    image: "https://i.ibb.co/cXhcVQPh/shutterstock-1476432527-1-1.jpg",
    slug: "preventing-running-injuries"
  },
  {
    title: "Cross-Training Workouts for Runners",
    excerpt: "Mix up your routine with cross-training exercises that improve strength and flexibility.",
    content: "Swimming, cycling, and yoga are excellent low-impact options that help prevent burnout and build complementary muscles. Schedule at least one cross-training session per week.",
    author: "684e541c9bbfcc2bb49aa295",
    image: "https://i.ibb.co/V0NGFKWf/Crosstraining-Runners-copy.jpg",
    slug: "cross-training-for-runners"
  },
  {
    title: "How to Build Mental Toughness for Race Day",
    excerpt: "A strong mindset is as important as physical fitness. Learn how to stay focused when it matters most.",
    content: "Visualization, positive self-talk, and goal setting are proven methods to build mental resilience. Practice these techniques during training runs to prepare for race-day challenges.",
    author: "684e79c4638f488df264deb9",
    image: "https://i.ibb.co/S76tW8YJ/I0u0y-GNd-Jclxf-WGBqisiwd-OUYa-E.jpg",
    slug: "mental-toughness-for-race-day"
  }
]


// const inserting =async()=>{
//    await Blog.insertMany(blogDataArray);
// }
// inserting()

module.exports={
    getBlogBySlug,
    getAllBlogs
}

