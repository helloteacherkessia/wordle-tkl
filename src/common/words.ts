export function getWordOfTheDay() {
  const now = new Date()
  const start = new Date(2024, 10, 7)
  const diff = Number(now) - Number(start)
  let day = Math.floor(diff / (1000 * 60 * 60 * 24))
  while (day > targetWords.length) {
    day -= targetWords.length
  }
  return targetWords[day]
}

const targetWords = [
  {
      "word": "cushion",
      "hint": "soft pillow for chairs"
  },
  {
      "word": "tree",
      "hint": "big plant with leaves"
  },
  {
      "word": "brain",
      "hint": "part of the head for thinking"
  },
  {
      "word": "grape",
      "hint": "small, round fruit"
  },
  {
      "word": "picture",
      "hint": "image or photo"
  },
  {
      "word": "pepper",
      "hint": "spicy seasoning"
  },
  {
      "word": "wolf",
      "hint": "wild animal related to dogs"
  },
  {
      "word": "glass",
      "hint": "clear material or cup"
  },
  {
      "word": "juice",
      "hint": "drink from fruit"
  },
  {
      "word": "blank",
      "hint": "empty, with nothing on it"
  },
  {
      "word": "bread",
      "hint": "food made from flour"
  },
  {
      "word": "snow",
      "hint": "cold, white ice from the sky"
  },
  {
      "word": "jump",
      "hint": "to go up fast"
  },
  {
      "word": "train",
      "hint": "long transport on tracks"
  },
  {
      "word": "doctor",
      "hint": "person who treats the sick"
  },
  {
      "word": "lantern",
      "hint": "light you carry outside"
  },
  {
      "word": "pizza",
      "hint": "food with cheese and toppings"
  },
  {
      "word": "book",
      "hint": "pages to read"
  },
  {
      "word": "guard",
      "hint": "person who protects"
  },
  {
      "word": "rock",
      "hint": "hard thing on the ground"
  },
  {
      "word": "lemon",
      "hint": "yellow sour fruit"
  },
  {
      "word": "bird",
      "hint": "animal that flies"
  },
  {
      "word": "butter",
      "hint": "yellow spread for bread"
  },
  {
      "word": "popcorn",
      "hint": "snack made from heated corn"
  },
  {
      "word": "cloud",
      "hint": "white in the sky, brings rain"
  },
  {
      "word": "marker",
      "hint": "tool for drawing or writing"
  },
  {
      "word": "violin",
      "hint": "string instrument played with a bow"
  },
  {
      "word": "channel",
      "hint": "tv or radio station"
  },
  {
      "word": "candy",
      "hint": "sweet treat"
  },
  {
      "word": "kitchen",
      "hint": "room for cooking"
  },
  {
      "word": "play",
      "hint": "have fun"
  },
  {
      "word": "biscuit",
      "hint": "small, baked food, often sweet"
  },
  {
      "word": "fire",
      "hint": "hot flames"
  },
  {
      "word": "head",
      "hint": "top part of the body"
  },
  {
      "word": "house",
      "hint": "place to live"
  },
  {
      "word": "gold",
      "hint": "yellow precious metal"
  },
  {
      "word": "wind",
      "hint": "moving air"
  },
  {
      "word": "smell",
      "hint": "sense of the nose"
  },
  {
      "word": "rain",
      "hint": "water from the sky"
  },
  {
      "word": "weather",
      "hint": "condition outside, like sunny or rainy"
  },
  {
      "word": "music",
      "hint": "sounds we listen to"
  },
  {
      "word": "love",
      "hint": "feeling of caring"
  },
  {
      "word": "ticket",
      "hint": "paper to enter a place or event"
  },
  {
      "word": "star",
      "hint": "bright light in space"
  },
  {
      "word": "wheel",
      "hint": "round part of a car"
  },
  {
      "word": "trouble",
      "hint": "difficulty or problem"
  },
  {
      "word": "editor",
      "hint": "person who prepares content for publishing"
  },
  {
      "word": "cold",
      "hint": "not warm"
  },
  {
      "word": "wine",
      "hint": "drink from grapes"
  },
  {
      "word": "carpet",
      "hint": "soft floor covering"
  },
  {
      "word": "thunder",
      "hint": "loud sound during a storm"
  },
  {
      "word": "food",
      "hint": "what we eat"
  },
  {
      "word": "throne",
      "hint": "seat for a king or queen"
  },
  {
      "word": "mouse",
      "hint": "small animal or computer tool"
  },
  {
      "word": "hill",
      "hint": "small mountain"
  },
  {
      "word": "nurse",
      "hint": "helps doctors and patients"
  },
  {
      "word": "four",
      "hint": "number after three"
  },
  {
      "word": "earth",
      "hint": "our planet"
  },
  {
      "word": "hand",
      "hint": "part of your arm"
  },
  {
      "word": "button",
      "hint": "small item for fastening clothes"
  },
  {
      "word": "daily",
      "hint": "happens every day"
  },
  {
      "word": "animal",
      "hint": "living being, not a plant"
  },
  {
      "word": "travel",
      "hint": "to go from place to place"
  },
  {
      "word": "garden",
      "hint": "place with plants and flowers"
  },
  {
      "word": "vitamin",
      "hint": "nutrient for health"
  },
  {
      "word": "plane",
      "hint": "transport that flies"
  },
  {
      "word": "time",
      "hint": "hours, minutes, seconds"
  },
  {
      "word": "milk",
      "hint": "white drink"
  },
  {
      "word": "night",
      "hint": "time when it’s dark"
  },
  {
      "word": "dream",
      "hint": "thoughts during sleep"
  },
  {
      "word": "plant",
      "hint": "green living thing"
  },
  {
      "word": "road",
      "hint": "path for cars"
  },
  {
      "word": "people",
      "hint": "more than one person"
  },
  {
      "word": "paper",
      "hint": "thin material to write on"
  },
  {
      "word": "floor",
      "hint": "bottom part of a room"
  },
  {
      "word": "balance",
      "hint": "to stay steady"
  },
  {
      "word": "fortune",
      "hint": "large amount of money or good luck"
  },
  {
      "word": "knife",
      "hint": "sharp tool for cutting"
  },
  {
      "word": "fortune",
      "hint": "wealth or good luck"
  },
  {
      "word": "chain",
      "hint": "linked metal loops"
  },
  {
      "word": "lizard",
      "hint": "reptile with a long tail"
  },
  {
      "word": "cash",
      "hint": "paper money"
  },
  {
      "word": "warm",
      "hint": "a little hot"
  },
  {
      "word": "apple",
      "hint": "red or green fruit"
  },
  {
      "word": "desert",
      "hint": "hot, dry land"
  },
  {
      "word": "blue",
      "hint": "color of the sky"
  },
  {
      "word": "angel",
      "hint": "heavenly being"
  },
  {
      "word": "citrus",
      "hint": "fruit like orange or lemon"
  },
  {
      "word": "table",
      "hint": "furniture from the kitchen"
  },
  {
      "word": "moon",
      "hint": "light in the night sky"
  },
  {
      "word": "bridge",
      "hint": "structure to cross over water"
  },
  {
      "word": "fossil",
      "hint": "old remains of plants or animals"
  },
  {
      "word": "smooth",
      "hint": "soft and even surface"
  },
  {
      "word": "stone",
      "hint": "small rock"
  },
  {
      "word": "beach",
      "hint": "sandy place by the sea"
  },
  {
      "word": "grill",
      "hint": "cook over fire"
  },
  {
      "word": "water",
      "hint": "clear liquid we drink"
  },
  {
      "word": "stars",
      "hint": "bright lights in the sky at night"
  },
  {
      "word": "spoon",
      "hint": "tool to eat soup"
  },
  {
      "word": "light",
      "hint": "bright, helps us see"
  },
  {
      "word": "deep",
      "hint": "far down or far in"
  },
  {
      "word": "dessert",
      "hint": "sweet treat after a meal"
  },
  {
      "word": "stadium",
      "hint": "large place for sports or concerts"
  },
  {
      "word": "explain",
      "hint": "to make something clear"
  },
  {
      "word": "jungle",
      "hint": "dense forest with many trees"
  },
  {
      "word": "bell",
      "hint": "makes a ringing sound"
  },
  {
      "word": "history",
      "hint": "study of past events"
  },
  {
      "word": "storm",
      "hint": "strong rain and wind"
  },
  {
      "word": "pigeon",
      "hint": "bird often found in cities"
  },
  {
      "word": "pocket",
      "hint": "small pouch in clothes"
  },
  {
      "word": "bite",
      "hint": "use teeth to cut"
  },
  {
      "word": "calm",
      "hint": "relaxed, not worried"
  },
  {
      "word": "balloon",
      "hint": "colorful item that floats with air"
  },
  {
      "word": "coffee",
      "hint": "hot drink"
  },
  {
      "word": "ghost",
      "hint": "spirit or soul"
  },
  {
      "word": "smile",
      "hint": "happy face"
  },
  {
      "word": "cook",
      "hint": "to prepare food with heat"
  },
  {
      "word": "shirt",
      "hint": "clothing for the top of your body"
  },
  {
      "word": "guitars",
      "hint": "musical instruments with strings"
  },
  {
      "word": "spider",
      "hint": "animal with eight legs"
  },
  {
      "word": "repair",
      "hint": "to fix something broken"
  },
  {
      "word": "island",
      "hint": "land with water all around"
  },
  {
      "word": "stick",
      "hint": "thin piece of wood"
  },
  {
      "word": "sheep",
      "hint": "animal with wool"
  },
  {
      "word": "clock",
      "hint": "tells the time"
  },
  {
      "word": "chair",
      "hint": "furniture for sitting"
  },
  {
      "word": "march",
      "hint": "third month of the year"
  },
  {
      "word": "fishing",
      "hint": "catching fish as a hobby or job"
  },
  {
      "word": "jacket",
      "hint": "clothing for cold weather"
  },
  {
      "word": "village",
      "hint": "small community or town"
  },
  {
      "word": "palace",
      "hint": "large, grand home, often for royalty"
  },
  {
      "word": "message",
      "hint": "written or spoken information for someone"
  },
  {
      "word": "door",
      "hint": "entrance to a room"
  },
  {
      "word": "bottle",
      "hint": "container for liquids"
  },
  {
      "word": "goblin",
      "hint": "small, mischievous creature in stories"
  },
  {
      "word": "grass",
      "hint": "green plant on the ground"
  },
  {
      "word": "blind",
      "hint": "unable to see"
  },
  {
      "word": "candle",
      "hint": "wax with a flame"
  },
  {
      "word": "ship",
      "hint": "boat on the sea"
  },
  {
      "word": "peach",
      "hint": "soft, juicy fruit"
  },
  {
      "word": "hanging",
      "hint": "suspended in the air"
  },
  {
      "word": "fruit",
      "hint": "sweet food from plants"
  },
  {
      "word": "woods",
      "hint": "small forest area"
  },
  {
      "word": "sand",
      "hint": "tiny grains at the beach"
  },
  {
      "word": "package",
      "hint": "box or item sent in the mail"
  },
  {
      "word": "faith",
      "hint": "strong belief"
  },
  {
      "word": "stature",
      "hint": "height of a person"
  },
  {
      "word": "silence",
      "hint": "complete quiet, no sound"
  },
  {
      "word": "green",
      "hint": "color of grass"
  },
  {
      "word": "alive",
      "hint": "living, not dead"
  },
  {
      "word": "cookie",
      "hint": "sweet, baked snack"
  },
  {
      "word": "storage",
      "hint": "place to keep things"
  },
  {
      "word": "north",
      "hint": "direction opposite of south"
  },
  {
      "word": "tunnel",
      "hint": "underground passage"
  },
  {
      "word": "jail",
      "hint": "place for criminals"
  },
  {
      "word": "black",
      "hint": "darkest color"
  },
  {
      "word": "cartoon",
      "hint": "animated TV show or movie"
  },
  {
      "word": "fish",
      "hint": "animal in the water"
  },
  {
      "word": "sugar",
      "hint": "sweet white powder"
  },
  {
      "word": "paint",
      "hint": "color for walls or art"
  },
  {
      "word": "market",
      "hint": "place to buy and sell goods"
  },
  {
      "word": "honey",
      "hint": "sweet food from bees"
  },
  {
      "word": "shark",
      "hint": "large fish with sharp teeth"
  },
  {
      "word": "country",
      "hint": "area with its own government"
  },
  {
      "word": "cradle",
      "hint": "bed for a baby"
  },
  {
      "word": "monster",
      "hint": "scary creature in stories"
  },
  {
      "word": "brick",
      "hint": "block used to build"
  },
  {
      "word": "gravity",
      "hint": "force that pulls us down to earth"
  },
  {
      "word": "rainbow",
      "hint": "colorful arc in the sky after rain"
  },
  {
      "word": "shoes",
      "hint": "what you wear on your feet"
  },
  {
      "word": "balloon",
      "hint": "colorful item that floats with air"
  }
]
