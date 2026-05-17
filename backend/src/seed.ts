import mongoose from "mongoose";
import dotenv from "dotenv";
import JobRequest from "./models/JobRequest.model";

dotenv.config();

const sampleJobs = [
  {
    title: "Leaking kitchen tap needs urgent repair",
    description: "The cold water tap in my kitchen has been dripping for two weeks. It is getting worse and I can hear it from the next room. Need someone to come out as soon as possible.",
    category: "Plumbing",
    location: "Matara",
    contactName: "Sihina Nimnada",
    contactEmail: "sihina@gmail.com",
    status: "Open",
  },
  {
    title: "Faulty outdoor power socket",
    description: "Garden socket trips the circuit breaker every time anything is plugged in. I think the waterproofing seal may have failed. Safe access from the garden.",
    category: "Electrical",
    location: "Galle",
    contactName: "Theekshana Amamadu",
    contactEmail: "Theekshana@gmail.com",
    status: "In Progress",
  },
  {
    title: "Full living room repaint",
    description: "Approximately 20 square metres. Current colour is magnolia, would like a neutral grey. Ceiling also needs a fresh coat. All furniture can be moved out.",
    category: "Painting",
    location: "Hambanthota",
    contactName: "Pathum Lakshan",
    contactEmail: "pathum@gmail.com",
    status: "Open",
  },
  {
    title: "Skirting boards coming away in hallway",
    description: "About 6 metres of skirting board have pulled away from the wall, likely due to moisture. The boards themselves are intact and just need re-fixing and re-sealing.",
    category: "Joinery",
    location: "Colombo",
    contactName: "Sihara Edirisinghe",
    contactEmail: "sihara@gmail.com",
    status: "Open",
  },
  {
    title: "Bathroom extractor fan installation",
    description: "New build property. No extractor fan has been fitted yet in the main bathroom. Looking for someone who can supply and install an appropriate unit.",
    category: "Electrical",
    location: "Kalutara",
    contactName: "Sandini Hasara",
    contactEmail: "sandini@gmail.com",
    status: "Open",
  },
  {
    title: "Replace broken fence panel",
    description: "One 6ft fence panel was blown down in the recent storm. The posts and gravel boards are still solid. Need the panel supplied and fitted.",
    category: "Joinery",
    location: "Kandy",
    contactName: "Dulangi Thennakon",
    contactEmail: "dulangi@gmail.com",
    status: "Closed",
  },
  {
    title: "Boiler pressure dropping repeatedly",
    description: "The combi boiler loses pressure every few days and requires re-pressurising manually. Suspect a small leak somewhere in the system. Boiler is 4 years old.",
    category: "Plumbing",
    location: "Kandy",
    contactName: "Ruwan Perera",
    contactEmail: "ruwan@gmail.com",
    status: "Open",
  },
  {
    title: "Kitchen ceiling water stain painting",
    description: "A burst pipe was fixed last month but left a large brown stain on the kitchen ceiling. Just need the stain sealed and ceiling painted over — roughly 6 sq metres.",
    category: "Painting",
    location: "Matara",
    contactName: "Janith Chathuranga",
    contactEmail: "janith@gmail.com",
    status: "In Progress",
  },
  {
    title: "Consumer unit upgrade required",
    description: "Old fuse box needs replacing with a modern consumer unit. The property is a 3-bed semi. Looking for a Part P certified electrician who can certify the work.",
    category: "Electrical",
    location: "Kalutara",
    contactName: "Nekmal Fernando",
    contactEmail: "nekmal@gmail.com",
    status: "Open",
  },
  {
    title: "Wardrobe built-in installation",
    description: "Alcove in master bedroom is approx 120cm wide and 210cm tall. Looking for someone to build a fitted wardrobe with two doors, a hanging rail, and two shelves.",
    category: "Joinery",
    location: "Colombo",
    contactName: "Sihara Edirisinghe",
    contactEmail: "sihara@gmail.com",
    status: "Open",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");

    await JobRequest.deleteMany({});
    console.log("Cleared existing jobs");

    const inserted = await JobRequest.insertMany(sampleJobs);
    console.log(`Seeded ${inserted.length} sample jobs`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();