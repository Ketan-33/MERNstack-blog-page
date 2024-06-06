import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { dbConnection } from "./database/dbConnection.js";
import { User } from "./models/userSchema.js";
import { Blog } from "./models/blogSchema.js";

const seedDB = async () => {
  await dbConnection();

  // Clear existing data
  await User.deleteMany({});
  await Blog.deleteMany({});

  // Create sample users
  const users = [
    {
      name: "Tester",
      email: "tester@example.com",
      phone: 123456789,
      avatar: {
        public_id: "bwwzkzu5qplqqskddyve",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717513460/bwwzkzu5qplqqskddyve.jpg",
      },
      education: "Matric",
      role: "Author",
      password: "password123",
    },
    {
      name: "Gengar",
      email: "gengar@example.com",
      phone: 123456789,
      avatar: {
        public_id: "belf2qjd7ggqjzvjkvzq",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717591477/belf2qjd7ggqjzvjkvzq.jpg",
      },
      education: "Matric",
      role: "Author",
      password: "password123",
    },
    {
      name: "Obito",
      email: "obito@example.com",
      phone: 123456789,
      avatar: {
        public_id: "qeffukczafllbrv1iz6j",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592090/qeffukczafllbrv1iz6j.jpg",
      },
      education: "Matric",
      role: "Author",
      password: "password123",
    },
  ];

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    })
  );

  const insertedUsers = await User.insertMany(users);

  // Create sample blogs
  const blogs = [
    {
      title: "First Example Blog",
      mainImage: {
        public_id: "dy6vpmaxfibymwm7tsmv",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717588980/dy6vpmaxfibymwm7tsmv.jpg",
      },
      intro:
        " Your Name (Kimi no Na wa), a 2016 Japanese animated film directed by Makoto Shinkai, is a visually stunning and emotionally evocative story that explores themes of love, fate, and the connection between people...",
      category: "Travel",
      createdBy: insertedUsers[0]._id,
      authorName: "Tester",
      authorAvatar:
        "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717513460/bwwzkzu5qplqqskddyve.jpg",
      published: true,
    },
    {
      title: "Life of pokemon",
      mainImage: {
        public_id: "us5qmsopyyash2rrk5dd",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717591915/us5qmsopyyash2rrk5dd.jpg",
      },
      intro:
        " The world of Pokémon, created by Satoshi Tajiri and Ken Sugimori, is a rich and immersive universe that has captivated fans since its inception in 1996...",
      category: "Lifestyle",
      createdBy: insertedUsers[1]._id,
      authorName: "Gengar",
      authorAvatar:
        "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717591477/belf2qjd7ggqjzvjkvzq.jpg",
      published: true,
    },
    {
      title: "Obito's love",
      mainImage: {
        public_id: "vvnyztoy2zgdea0z6vd0",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592508/vvnyztoy2zgdea0z6vd0.jpg",
      },
      intro:
        " Obito Uchiha, a complex character from the popular anime and manga series Naruto exemplifies the tragic and transformative power of love...",
      category: "Love",
      createdBy: insertedUsers[2]._id,
      authorName: "Obito",
      authorAvatar:
        "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592090/qeffukczafllbrv1iz6j.jpg",
      published: true,
    },
    {
      title: "Example unpublished blog",
      mainImage: {
        public_id: "vvnyztoy2zgdea0z6vd0",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592508/vvnyztoy2zgdea0z6vd0.jpg",
      },
      intro:
        " Obito Uchiha, a complex character from the popular anime and manga series Naruto exemplifies the tragic and transformative power of love...",
      category: "Love",
      createdBy: insertedUsers[2]._id,
      authorName: "Obito",
      authorAvatar:
        "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592090/qeffukczafllbrv1iz6j.jpg",
      published: false,
    },
  ];

  await Blog.insertMany(blogs);

  console.log("Database seeded successfully");
  process.exit();
};

seedDB();
