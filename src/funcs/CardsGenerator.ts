const ABC: { id: number; value: string }[] = [
  { id: 0, value: "A" },
  { id: 1, value: "B" },
  { id: 2, value: "C" },
  { id: 3, value: "D" },
  { id: 4, value: "E" },
  { id: 5, value: "F" },
  { id: 6, value: "G" },
  { id: 7, value: "H" },
  { id: 8, value: "I" },
  { id: 9, value: "J" },
  { id: 10, value: "K" },
  { id: 11, value: "L" },
  { id: 12, value: "M" },
  { id: 13, value: "N" },
  { id: 14, value: "O" },
  { id: 15, value: "P" },
  { id: 16, value: "Q" },
  { id: 17, value: "R" },
  { id: 18, value: "S" },
  { id: 19, value: "T" },
  { id: 20, value: "U" },
  { id: 21, value: "V" },
  { id: 22, value: "W" },
  { id: 23, value: "X" },
  { id: 24, value: "Y" },
  { id: 25, value: "Z" },
];

const EMOJIS: { id: number; value: string }[] = [
  { id: 0, value: "😊" },
  { id: 1, value: "😍" },
  { id: 2, value: "😎" },
  { id: 3, value: "🥺" },
  { id: 4, value: "😂" },
  { id: 5, value: "🤔" },
  { id: 6, value: "🙌" },
  { id: 7, value: "💥" },
  { id: 8, value: "🌟" },
  { id: 9, value: "🔥" },
  { id: 10, value: "🌈" },
  { id: 11, value: "🍕" },
  { id: 12, value: "🍎" },
  { id: 13, value: "🎉" },
  { id: 14, value: "⚽" },
  { id: 15, value: "🎶" },
  { id: 16, value: "🎨" },
  { id: 17, value: "🐶" },
  { id: 18, value: "🐱" },
  { id: 19, value: "🦄" },
  { id: 20, value: "🍩" },
  { id: 21, value: "🎁" },
  { id: 22, value: "🥳" },
  { id: 23, value: "🤗" },
  { id: 24, value: "💫" },
  { id: 25, value: "🌻" },
  { id: 26, value: "🌍" },
  { id: 27, value: "🌙" },
  { id: 28, value: "💖" },
  { id: 29, value: "🎃" },
  { id: 30, value: "🦋" },
  { id: 31, value: "🐝" },
  { id: 32, value: "🐦" },
  { id: 33, value: "🍇" },
  { id: 34, value: "🥑" },
  { id: 35, value: "🍔" },
  { id: 36, value: "🍓" },
  { id: 37, value: "🧩" },
  { id: 38, value: "🏀" },
  { id: 39, value: "🏖" },
  { id: 40, value: "🌵" },
  { id: 41, value: "🌊" },
  { id: 42, value: "🎮" },
  { id: 43, value: "🧸" },
  { id: 44, value: "🍿" },
  { id: 45, value: "🍿" },
  { id: 46, value: "🧑‍🎤" },
  { id: 47, value: "🎩" },
  { id: 48, value: "💌" },
  { id: 49, value: "👑" },
  { id: 50, value: "🧃" },
  { id: 51, value: "🥂" },
  { id: 52, value: "🍺" },
  { id: 53, value: "🌸" },
];

export default function handleCardsDetails(topic: string, GridSize: number) {
  if (topic == "ABC") {
    const slicedArray = ABC.slice(0, GridSize);
    const concatedABC = slicedArray.concat(slicedArray);
    const updatedABC = concatedABC.map((ele, i) => ({ ...ele, id: i }));
    const sortedABC = updatedABC.sort(() => Math.random() - 0.5);
    return sortedABC;
  } else if (topic == "EMOJIS") {
    const slicedArray = EMOJIS.slice(0, GridSize);
    const concatedEMOJIS = slicedArray.concat(slicedArray);
    const updatedEMOJIS = concatedEMOJIS.map((ele, i) => ({ ...ele, id: i }));
    const sortedEMOJIS = updatedEMOJIS.sort(() => {
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
