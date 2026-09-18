export const tourFunFacts = {
  "hunza": [
    "Attabad Lake was born in 2010 after a massive mountain collapse.",
    "Khunjerab Pass features the world's highest operational ATM.",
    "The Passu Cones are so razor-sharp that snow cannot settle on them."
  ],
  "skardu": [
    "Katpana & Sarfaranga are among the highest cold deserts on Earth.",
    "The 400-year-old Shigar Fort was built entirely without iron nails.",
    "Upper Kachura Lake's crystal-clear water is over 70 meters deep."
  ],
  "swat": [
    "Malam Jabba is Pakistan's premier winter sports and skiing center.",
    "Ushu Forest features towering Deodar cedars over 400 years old.",
    "Swat Valley was the ancient center of Buddhist Gandhara art."
  ],
  "kashmir": [
    "Sharda Peeth was an ancient South Asian university for Sanskrit philosophy.",
    "Arang Kel is perched high on a plateau, reached by a river cable dolly.",
    "At Keran, the river dividing the valley is narrow enough to see across."
  ],
  "naran": [
    "Local legends claim fairies dance at Lake Saif-ul-Mulook under full moons.",
    "Babusar Top provides a dramatic 13,700-foot gateway into Chilas.",
    "Kunhar River's glacial waters sustain wild rainbow and brown trout."
  ],
  "shogran": [
    "Siri Paye meadows frequently sit above dramatic cloud inversions.",
    "The track to Siri Paye is a famous vintage 4x4 jeep trail.",
    "The meadows are shadowed by the steep pyramid of Makra Peak."
  ],
  "kumrat": [
    "Katora Lake gets its name from its bowl-like shape.",
    "The historic wooden mosque in Thal village is a masterpiece.",
    "Kumrat is renowned for its towering Deodar cedar trees."
  ]
};

export function getFunFactsForPackage(pkg) {
  if (!pkg) return [];
  const text = (pkg.id + " " + pkg.title + " " + (pkg.type || "")).toLowerCase();
  if (text.includes("hunza") || text.includes("china")) return tourFunFacts["hunza"];
  if (text.includes("skardu")) return tourFunFacts["skardu"];
  if (text.includes("swat") || text.includes("kalam")) return tourFunFacts["swat"];
  if (text.includes("kashmir") || text.includes("neelum") || text.includes("taobut") || text.includes("arang")) return tourFunFacts["kashmir"];
  if (text.includes("shogran") || text.includes("siri")) return tourFunFacts["shogran"];
  if (text.includes("naran") || text.includes("babusar")) return tourFunFacts["naran"];
  if (text.includes("kumrat")) return tourFunFacts["kumrat"];
  return tourFunFacts["hunza"];
}
