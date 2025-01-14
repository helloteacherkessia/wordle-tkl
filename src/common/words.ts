export function getWordOfTheDay() {
  const now = new Date();
  const start = new Date(2025, 0, 12);
  const diff = Number(now) - Number(start);
  let day = Math.floor(diff / (1000 * 60 * 60 * 24));
  while (day > targetWords.length) {
    day -= targetWords.length;
  }
  return targetWords[day];
}

const targetWords = [
  {
    word: "time",
    hint: "hours, minutes, seconds",
  },
  {
    word: "milk",
    hint: "white drink",
  },
  {
    word: "night",
    hint: "time when it’s dark",
  },
  {
    word: "dream",
    hint: "thoughts during sleep",
  },
  {
    word: "pigeon",
    hint: "bird often found in cities",
  },
  {
    word: "violin",
    hint: "string instrument played with a bow",
  },
  {
    word: "channel",
    hint: "tv or radio station",
  },
  {
    word: "wind",
    hint: "moving air",
  },
  {
    word: "pocket",
    hint: "small pouch in clothes",
  },
  {
    word: "people",
    hint: "more than one person",
  },
  {
    word: "brain",
    hint: "part of the head for thinking",
  },
  {
    word: "explain",
    hint: "to make something clear",
  },
  {
    word: "vitamin",
    hint: "nutrient for health",
  },
  {
    word: "market",
    hint: "place to buy and sell goods",
  },
  {
    word: "star",
    hint: "bright light in space",
  },
  {
    word: "stick",
    hint: "thin piece of wood",
  },
  {
    word: "smell",
    hint: "sense of the nose",
  },
  {
    word: "throne",
    hint: "seat for a king or queen",
  },
  {
    word: "coffee",
    hint: "hot drink",
  },
  {
    word: "country",
    hint: "area with its own government",
  },
  {
    word: "sugar",
    hint: "sweet white powder",
  },
  {
    word: "brick",
    hint: "block used to build",
  },
  {
    word: "hill",
    hint: "small mountain",
  },
  {
    word: "shark",
    hint: "large fish with sharp teeth",
  },
  {
    word: "ticket",
    hint: "paper to enter a place or event",
  },
  {
    word: "clock",
    hint: "tells the time",
  },
  {
    word: "grape",
    hint: "small, round fruit",
  },
  {
    word: "balloon",
    hint: "colorful item that floats with air",
  },
  {
    word: "bridge",
    hint: "structure to cross over water",
  },
  {
    word: "fish",
    hint: "animal in the water",
  },
  {
    word: "road",
    hint: "path for cars",
  },
  {
    word: "knife",
    hint: "sharp tool for cutting",
  },
  {
    word: "honey",
    hint: "sweet food from bees",
  },
  {
    word: "paper",
    hint: "thin material to write on",
  },
  {
    word: "jump",
    hint: "to go up fast",
  },
  {
    word: "table",
    hint: "furniture from the kitchen",
  },
  {
    word: "door",
    hint: "entrance to a room",
  },
  {
    word: "stone",
    hint: "small rock",
  },
  {
    word: "earth",
    hint: "our planet",
  },
  {
    word: "four",
    hint: "number after three",
  },
  {
    word: "wolf",
    hint: "wild animal related to dogs",
  },
  {
    word: "mouse",
    hint: "small animal or computer tool",
  },
  {
    word: "spider",
    hint: "animal with eight legs",
  },
  {
    word: "moon",
    hint: "light in the night sky",
  },
  {
    word: "bottle",
    hint: "container for liquids",
  },
  {
    word: "sheep",
    hint: "animal with wool",
  },
  {
    word: "hand",
    hint: "part of your arm",
  },
  {
    word: "lizard",
    hint: "reptile with a long tail",
  },
  {
    word: "picture",
    hint: "image or photo",
  },
  {
    word: "light",
    hint: "bright, helps us see",
  },
  {
    word: "kitchen",
    hint: "room for cooking",
  },
  {
    word: "travel",
    hint: "to go from place to place",
  },
  {
    word: "juice",
    hint: "drink from fruit",
  },
  {
    word: "popcorn",
    hint: "snack made from heated corn",
  },
  {
    word: "lantern",
    hint: "light you carry outside",
  },
  {
    word: "grill",
    hint: "cook over fire",
  },
  {
    word: "rainbow",
    hint: "colorful arc in the sky after rain",
  },
  {
    word: "floor",
    hint: "bottom part of a room",
  },
  {
    word: "paint",
    hint: "color for walls or art",
  },
  {
    word: "blue",
    hint: "color of the sky",
  },
  {
    word: "lemon",
    hint: "yellow sour fruit",
  },
  {
    word: "calm",
    hint: "relaxed, not worried",
  },
  {
    word: "monster",
    hint: "scary creature in stories",
  },
  {
    word: "warm",
    hint: "a little hot",
  },
  {
    word: "guard",
    hint: "person who protects",
  },
  {
    word: "fortune",
    hint: "wealth or good luck",
  },
  {
    word: "glass",
    hint: "clear material or cup",
  },
  {
    word: "head",
    hint: "top part of the body",
  },
  {
    word: "candle",
    hint: "wax with a flame",
  },
  {
    word: "gravity",
    hint: "force that pulls us down to earth",
  },
  {
    word: "march",
    hint: "third month of the year",
  },
  {
    word: "history",
    hint: "study of past events",
  },
  {
    word: "fishing",
    hint: "catching fish as a hobby or job",
  },
  {
    word: "stars",
    hint: "bright lights in the sky at night",
  },
  {
    word: "green",
    hint: "color of grass",
  },
  {
    word: "button",
    hint: "small item for fastening clothes",
  },
  {
    word: "pizza",
    hint: "food with cheese and toppings",
  },
  {
    word: "pepper",
    hint: "spicy seasoning",
  },
  {
    word: "chair",
    hint: "furniture for sitting",
  },
  {
    word: "alive",
    hint: "living, not dead",
  },
  {
    word: "trouble",
    hint: "difficulty or problem",
  },
  {
    word: "tunnel",
    hint: "underground passage",
  },
  {
    word: "water",
    hint: "clear liquid we drink",
  },
  {
    word: "snow",
    hint: "cold, white ice from the sky",
  },
  {
    word: "house",
    hint: "place to live",
  },
  {
    word: "weather",
    hint: "condition outside, like sunny or rainy",
  },
  {
    word: "train",
    hint: "long transport on tracks",
  },
  {
    word: "shirt",
    hint: "clothing for the top of your body",
  },
  {
    word: "rock",
    hint: "hard thing on the ground",
  },
  {
    word: "woods",
    hint: "small forest area",
  },
  {
    word: "cook",
    hint: "to prepare food with heat",
  },
  {
    word: "desert",
    hint: "hot, dry land",
  },
  {
    word: "chain",
    hint: "linked metal loops",
  },
  {
    word: "tree",
    hint: "big plant with leaves",
  },
  {
    word: "angel",
    hint: "heavenly being",
  },
  {
    word: "cushion",
    hint: "soft pillow for chairs",
  },
  {
    word: "black",
    hint: "darkest color",
  },
  {
    word: "wheel",
    hint: "round part of a car",
  },
  {
    word: "dessert",
    hint: "sweet treat after a meal",
  },
  {
    word: "ship",
    hint: "boat on the sea",
  },
  {
    word: "blank",
    hint: "empty, with nothing on it",
  },
  {
    word: "cloud",
    hint: "white in the sky, brings rain",
  },
  {
    word: "hanging",
    hint: "suspended in the air",
  },
  {
    word: "jacket",
    hint: "clothing for cold weather",
  },
  {
    word: "love",
    hint: "feeling of caring",
  },
  {
    word: "animal",
    hint: "living being, not a plant",
  },
  {
    word: "palace",
    hint: "large, grand home, often for royalty",
  },
  {
    word: "fossil",
    hint: "old remains of plants or animals",
  },
  {
    word: "cartoon",
    hint: "animated TV show or movie",
  },
  {
    word: "daily",
    hint: "happens every day",
  },
  {
    word: "editor",
    hint: "person who prepares content for publishing",
  },
  {
    word: "doctor",
    hint: "person who treats the sick",
  },
  {
    word: "rain",
    hint: "water from the sky",
  },
  {
    word: "sand",
    hint: "tiny grains at the beach",
  },
  {
    word: "cradle",
    hint: "bed for a baby",
  },
  {
    word: "smile",
    hint: "happy face",
  },
  {
    word: "plane",
    hint: "transport that flies",
  },
  {
    word: "plant",
    hint: "green living thing",
  },
  {
    word: "blind",
    hint: "unable to see",
  },
  {
    word: "candy",
    hint: "sweet treat",
  },
  {
    word: "food",
    hint: "what we eat",
  },
  {
    word: "village",
    hint: "small community or town",
  },
  {
    word: "bread",
    hint: "food made from flour",
  },
  {
    word: "fire",
    hint: "hot flames",
  },
  {
    word: "grass",
    hint: "green plant on the ground",
  },
  {
    word: "jail",
    hint: "place for criminals",
  },
  {
    word: "cookie",
    hint: "sweet, baked snack",
  },
  {
    word: "silence",
    hint: "complete quiet, no sound",
  },
  {
    word: "apple",
    hint: "red or green fruit",
  },
  {
    word: "balance",
    hint: "to stay steady",
  },
  {
    word: "bell",
    hint: "makes a ringing sound",
  },
  {
    word: "thunder",
    hint: "loud sound during a storm",
  },
  {
    word: "play",
    hint: "have fun",
  },
  {
    word: "jungle",
    hint: "dense forest with many trees",
  },
  {
    word: "package",
    hint: "box or item sent in the mail",
  },
  {
    word: "cold",
    hint: "not warm",
  },
  {
    word: "ghost",
    hint: "spirit or soul",
  },
  {
    word: "spoon",
    hint: "tool to eat soup",
  },
  {
    word: "book",
    hint: "pages to read",
  },
  {
    word: "balloon",
    hint: "colorful item that floats with air",
  },
  {
    word: "fruit",
    hint: "sweet food from plants",
  },
  {
    word: "north",
    hint: "direction opposite of south",
  },
  {
    word: "stadium",
    hint: "large place for sports or concerts",
  },
  {
    word: "stature",
    hint: "height of a person",
  },
  {
    word: "citrus",
    hint: "fruit like orange or lemon",
  },
  {
    word: "music",
    hint: "sounds we listen to",
  },
  {
    word: "nurse",
    hint: "helps doctors and patients",
  },
  {
    word: "island",
    hint: "land with water all around",
  },
  {
    word: "message",
    hint: "written or spoken information for someone",
  },
  {
    word: "smooth",
    hint: "soft and even surface",
  },
  {
    word: "marker",
    hint: "tool for drawing or writing",
  },
  {
    word: "beach",
    hint: "sandy place by the sea",
  },
  {
    word: "garden",
    hint: "place with plants and flowers",
  },
  {
    word: "faith",
    hint: "strong belief",
  },
  {
    word: "bird",
    hint: "animal that flies",
  },
  {
    word: "goblin",
    hint: "small, mischievous creature in stories",
  },
  {
    word: "butter",
    hint: "yellow spread for bread",
  },
  {
    word: "bite",
    hint: "use teeth to cut",
  },
  {
    word: "storage",
    hint: "place to keep things",
  },
  {
    word: "carpet",
    hint: "soft floor covering",
  },
  {
    word: "repair",
    hint: "to fix something broken",
  },
  {
    word: "guitars",
    hint: "musical instruments with strings",
  },
  {
    word: "peach",
    hint: "soft, juicy fruit",
  },
  {
    word: "storm",
    hint: "strong rain and wind",
  },
  {
    word: "fortune",
    hint: "large amount of money or good luck",
  },
  {
    word: "cash",
    hint: "paper money",
  },
  {
    word: "shoes",
    hint: "what you wear on your feet",
  },
  {
    word: "gold",
    hint: "yellow precious metal",
  },
  {
    word: "wine",
    hint: "drink from grapes",
  },
  {
    word: "deep",
    hint: "far down or far in",
  },
  {
    word: "biscuit",
    hint: "small, baked food, often sweet",
  },
];
