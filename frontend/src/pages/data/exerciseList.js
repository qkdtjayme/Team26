export const EXERCISES_PER_TYPE = {
  underWeight: ["squats", "deadlifts", "pushups", "curls"],
  healthyWeight: ["overheadpress", "squats", "deadlifts", "pushups", "barbellrow"],
  overWeight: ["lunges", "squats", "deadlifts", "pushups", "jacks"],
  obese: ["jacks", "squats", "lunges", "deadlifts","overheadpress"],
};

export const EXERCISES = {
  curls: {
    name: "Bicep Curls",
    imageFile: "bicep.jpg",
    description: "MUSCLE STRENGTH | Build strength in your Upper Arm.",
    link: "/curl",
  },
  deadlifts: {
    name: "Deadlifts",
    imageFile: "lift.jpg",
    description: "MUSCLE STRENGTH | Strengthening Upper and Lower Back, and Glutes.",
    link: "/lift",
  },
  jacks: {
    name: "Jump Jacks",
    imageFile: "jacks.jpg",
    description: "ENDURANCE | Burn Fat and Build Muscle without using Weights.",
    link: "/jack",
  },
  lunges: {
    name: "Lunges",
    imageFile: "lunges.jpg",
    description: "ENDURANCE | Increases Muscle Mass in Core, Butt, and Legs.",
    link: "/lunge",
  },
  pushups: {
    name: "Push Ups",
    imageFile: "pushup.jpg",
    description: "ENDURANCE | Strengthen and tone Chest, Triceps, and Shoulders.",
    link: "/pushup",
  },
  overheadpress: {
    name: "OverheadPress",
    imageFile: "press.jpg",
    description: "MUSCLE STRENGTH | Strengthen Shoulders, and Triceps.",
    link: "/overheadpress",
  }, 
};
