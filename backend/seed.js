import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { dbConnection } from "./database/dbConnection.js";
import bcrypt from "bcrypt";
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
      email: "Obito@example.com",
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

  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const createdUsers = await User.insertMany(users);

  // Create sample blogs
  const blogs = [
    {
      title: "First Example Blog",
      mainImage: {
        public_id: "dy6vpmaxfibymwm7tsmv",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717588980/dy6vpmaxfibymwm7tsmv.jpg",
      },
      intro:
        " Your Name (Kimi no Na wa), a 2016 Japanese animated film directed by Makoto Shinkai, is a visually stunning and emotionally evocative story that explores themes of love, fate, and the connection between people. The film centers around two high school students, Mitsuha Miyamizu and Taki Tachibana, who live in different parts of Japan and have never met. One day, they mysteriously begin to swap bodies intermittently, experiencing each other's lives firsthand. Mitsuha, a girl from a rural town called Itomori, longs for the excitement of the city, while Taki, a boy from bustling Tokyo, navigates the complexities of urban life. As they continue to switch places, they develop a deep bond and work together to adjust to their new realities, leaving notes and messages to communicate. The plot thickens when they attempt to meet in person and discover a shocking truth: they are separated not only by distance but also by time, with Mitsuha's timeline existing three years in the past. The narrative weaves a poignant tale of connection and longing, driven by Shinkai's breathtaking animation and a memorable score by the band Radwimps. The film masterfully blends elements of romance, fantasy, and drama, capturing the hearts of audiences worldwide. Your Name delves into the idea that connections transcend time and space, emphasizing the profound impact people can have on each other's lives. The film's critical and commercial success solidified Shinkai's reputation as one of the leading voices in contemporary animation.",
      category: "Travel",
      createdBy: "665f2cf544779281dc3903ee",
      authorName: "tester",
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
        " The world of Pokémon, created by Satoshi Tajiri and Ken Sugimori, is a rich and immersive universe that has captivated fans since its inception in 1996. Pokémon, short for Pocket Monsters, are creatures that inhabit this world, each with unique abilities, types, and characteristics. The core of the Pokémon experience revolves around the journey of Pokémon Trainers, who catch, train, and battle these creatures to become Pokémon Masters. In the Pokémon universe, life revolves around the symbiotic relationship between humans and Pokémon. Trainers embark on adventures across diverse regions, each with its unique ecosystems and Pokémon species. They strive to capture and train Pokémon, participate in battles, and earn badges from various gyms to qualify for regional leagues. The ultimate goal for many is to become the Champion of the Pokémon League, a prestigious title awarded to the most skilled trainers. Beyond battles, Pokémon are integral to daily life in this world. They assist in various professions, from agriculture and construction to healthcare and emergency services. For instance, Chansey and Audino are often seen helping in Pokémon Centers, providing medical care. Pokémon like Machoke and Gurdurr assist in building and heavy lifting, showcasing the diverse roles these creatures play in society. The bond between Pokémon and their trainers is central to the narrative, emphasizing themes of friendship, trust, and growth. This relationship is depicted through the care trainers provide, the teamwork in battles, and the mutual respect that develops over time. The expansive world of Pokémon also includes competitive battling, breeding, and contests, offering multiple ways for trainers to engage with their Pokémon. With over 900 species, each new generation of games expands the lore and introduces new mechanics, keeping the franchise fresh and engaging. The enduring popularity of Pokémon, spanning video games, trading cards, TV shows, and movies, underscores its impact on popular culture and its ability to inspire millions of fans worldwide.",
      paraOneImage: {
        public_id: "hngidpjo9yfgn6rd67ej",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717591914/hngidpjo9yfgn6rd67ej.jpg",
      },
      paraTwoImage: {
        public_id: "nngq0gffmn4ieh2qv2lk",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717591916/nngq0gffmn4ieh2qv2lk.jpg",
      },
      paraTwoDescription:
        "The enduring popularity of Pokémon, spanning video games, trading cards, TV shows, and movies, underscores its impact on popular culture and its ability to inspire millions of fans worldwide. This phenomenon has fostered a global community where players connect, trade, and compete, transcending age and geographical boundaries. The continuous evolution of the Pokémon universe, with its new regions, species, and innovations, ensures that it remains a dynamic and cherished part of fans' lives. Ultimately, Pokémon is more than just a game or a show; it is a cultural icon that celebrates adventure, friendship, and the boundless potential of discovery.",
      category: "Lifestyle",
      createdBy: "66605db792784ff741b25b30",
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
        " Obito Uchiha, a complex character from the popular anime and manga series Naruto exemplifies the tragic and transformative power of love. Initially introduced as a kind-hearted and somewhat clumsy ninja, Obito's life takes a dark turn following a series of harrowing events. His love story, primarily revolving around his feelings for Rin Nohara, is central to his character development and the narrative's emotional depth. Obito's love for Rin is pure and unwavering, rooted in their shared childhood and dreams. This affection drives much of his actions and motivations. When Rin is killed during a mission, Obito is consumed by grief and despair. This devastating loss becomes the catalyst for his transformation from a hopeful young ninja into a formidable antagonist. Rin's death shatters Obito’s perception of reality and love, leading him to adopt a nihilistic worldview under the influence of Madara Uchiha. His pain and longing are manipulated, turning his love for Rin into a tool for spreading darkness. Despite his descent into darkness, Obito's love for Rin remains a poignant aspect of his character. It is this enduring love that eventually leads to his redemption. In his final moments, Obito reflects on his choices and sacrifices himself to protect Naruto and his friends, drawing parallels between his initial ideals and the values Naruto embodies. His love for Rin, though tragic, ultimately guides him back to the light, highlighting the redemptive power of love even in the face of profound loss and suffering.",

      paraOneImage: {
        public_id: "lt9ng15zvfotjgigb32w",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592508/lt9ng15zvfotjgigb32w.jpg",
      },
      paraOneDescription:
        "Obito's journey underscores the complexity of love in the Naruto universe—its ability to inspire, devastate, and ultimately redeem. His story is a poignant reminder of how love can shape destinies, for better or worse, and its enduring influence on the human spirit.",
      category: "Love",
      createdBy: "6660601c92784ff741b29baa",
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
        " Obito Uchiha, a complex character from the popular anime and manga series Naruto exemplifies the tragic and transformative power of love. Initially introduced as a kind-hearted and somewhat clumsy ninja, Obito's life takes a dark turn following a series of harrowing events. His love story, primarily revolving around his feelings for Rin Nohara, is central to his character development and the narrative's emotional depth. Obito's love for Rin is pure and unwavering, rooted in their shared childhood and dreams. This affection drives much of his actions and motivations. When Rin is killed during a mission, Obito is consumed by grief and despair. This devastating loss becomes the catalyst for his transformation from a hopeful young ninja into a formidable antagonist. Rin's death shatters Obito’s perception of reality and love, leading him to adopt a nihilistic worldview under the influence of Madara Uchiha. His pain and longing are manipulated, turning his love for Rin into a tool for spreading darkness. Despite his descent into darkness, Obito's love for Rin remains a poignant aspect of his character. It is this enduring love that eventually leads to his redemption. In his final moments, Obito reflects on his choices and sacrifices himself to protect Naruto and his friends, drawing parallels between his initial ideals and the values Naruto embodies. His love for Rin, though tragic, ultimately guides him back to the light, highlighting the redemptive power of love even in the face of profound loss and suffering.",

      paraOneImage: {
        public_id: "lt9ng15zvfotjgigb32w",
        url: "https://res.cloudinary.com/dqzdcgsdw/image/upload/v1717592508/lt9ng15zvfotjgigb32w.jpg",
      },
      paraOneDescription:
        "Obito's journey underscores the complexity of love in the Naruto universe—its ability to inspire, devastate, and ultimately redeem. His story is a poignant reminder of how love can shape destinies, for better or worse, and its enduring influence on the human spirit.",
      category: "Love",
      createdBy: "6660601c92784ff741b29baa",
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
