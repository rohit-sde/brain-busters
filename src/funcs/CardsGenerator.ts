const ABC: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const EMOJIS: string[] = [
  "😊",
  "😍",
  "😎",
  "🥺",
  "😂",
  "🤔",
  "🙌",
  "💥",
  "🌟",
  "🔥",
  "🌈",
  "🍕",
  "🍎",
  "🎉",
  "⚽",
  "🎶",
  "🎨",
  "🐶",
  "🐱",
  "🦄",
  "🍩",
  "🎁",
  "🥳",
  "🤗",
  "💫",
  "🌻",
  "🌍",
  "🌙",
  "💖",
  "🎃",
  "🦋",
  "🐝",
  "🐦",
  "🍇",
  "🥑",
  "🍔",
  "🍓",
  "🧩",
  "🏀",
  "🏖",
  "🌵",
  "🌊",
  "🎮",
  "🧸",
  "🍿",
  "🍿",
  "🧑‍🎤",
  "🎩",
  "💌",
  "👑",
  "🧃",
  "🥂",
  "🍺",
  "🌸",
];

export default function handleCardsDetails(topic: string, GridSize: number) {
  if (topic == "ABC") {
    const slicedArray = ABC.slice(0, GridSize);
    const sortedABC = slicedArray.concat(slicedArray).sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedABC];
  } else if (topic == "EMOJIS") {
    const slicedArray = EMOJIS.slice(0, GridSize);
    const sortedEMOJIS = slicedArray.concat(slicedArray).sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedEMOJIS];
  } else if (topic == "NUM") {
    const NUMSArray = [];
    for (let i = 0; i < GridSize; i++) {
      NUMSArray.push(Math.floor(Math.random() * 100));
    }
    const sortedNUM = NUMSArray.concat(NUMSArray).sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedNUM];
  } else {
    const ColorsArray = Array(GridSize).map(() => {
      const r = Math.floor(Math.random() * 51); // Darker red range
      const g = Math.floor(Math.random() * 51); // Darker green range
      const b = Math.floor(Math.random() * 51); // Darker blue range

      // Convert the RGB values to a hexadecimal color string
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    });
    const sortedColors = ColorsArray.concat(ColorsArray).sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedColors];
  }
}
