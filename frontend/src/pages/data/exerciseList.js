export const EXERCISES_PER_TYPE = {
  underWeight: ["squats", "deadlifts", "pushups", "curls"],
  healthyWeight: ["lraise", "squats", "deadlifts", "pushups", "barbellrow"],
  overWeight: ["lunges", "squats", "deadlifts", "pushups", "jacks"],
  obese: ["jacks", "squats", "lunges", "deadlifts","overheadpress"],
};

export const EXERCISES = {
  curls: {
    name: "Bicep Curls",
    imageFile: "bicep.jpg",
    description: "STRENGTH | Build strength in your Upper Arm.",
    link: "/curl",
  },
  deadlifts: {
    name: "Deadlifts",
    imageFile: "lift.jpg",
    description: "STRENGTH | Strengthening Upper and Lower Back, Glutes, and Hamstrings.",
    link: "/lift",
  },
  jacks: {
    name: "Jump Jacks",
    imageFile: "jacks.jpg",
    description: "STRENGTH | Burn Fat and Build Muscle without using Weights.",
    link: "/jack",
  },
  lunges: {
    name: "Lunges",
    imageFile: "lunges.jpg",
    description: "STRENGTH | Increases Muscle Mass in Core, Butt, and Legs.",
    link: "/lunge",
  },
  pushups: {
    name: "Push Ups",
    imageFile: "pushup.jpg",
    description: "STRENGTH | Strengthen and tone Chest, Triceps, and Shoulders.",
    link: "/pushup",
  },
  overheadpress: {
    name: "Overhead Press",
    imageFile: "press.jpg",
    description: "STRENGTH | Strengthen Shoulders, Traps, and Triceps.",
    link: "/overheadpress",
  }, 
};
