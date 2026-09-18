import placesData from "./placesData.json";

export const destinationPlacesMap = {
  "hunza-valley": [
    "karimabad",
    "attabad-lake",
    "passu-cones",
    "hussaini-bridge",
    "khunjerab-pass"
  ],
  "skardu-baltistan": [
    "shangrila-resort",
    "upper-kachura-lake",
    "cold-desert-katpana",
    "shigar-fort",
    "manthoka-waterfall",
    "bashu-valley"
  ],
  "swat-kalam": [
    "malam-jabba",
    "kalam-valley",
    "mahodand-lake",
    "ushu-forest"
  ],
  "naran-kaghan-babusar": [
    "lake-saif-ul-mulook",
    "babusar-top"
  ],
  "kashmir-neelum-taobut": [
    "arang-kel",
    "sharda-peeth",
    "taobut"
  ],
  "kumrat-valley": [
    "kumrat-forest"
  ],
  "shogran-siripaye": [
    "siri-paye"
  ]
};

export function getAttractionsForDestination(destId) {
  const keys = destinationPlacesMap[destId] || [];
  return keys
    .map((key) => {
      if (!placesData[key]) return null;
      return {
        id: key,
        ...placesData[key]
      };
    })
    .filter(Boolean);
}
