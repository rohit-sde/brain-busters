import { ABC, EMOJIS, SHAPES } from "./conts";

export default function handleCardsDetails(topic: string, GridSize: number) {
  const newnum = (GridSize * GridSize) / 2;
  if (topic == "ABC") {
    const slicedArray = ABC.slice(0, newnum);
    const concatedABC = slicedArray.concat(slicedArray);
    const updatedABC = concatedABC.map((ele, i) => ({ ...ele, id: i }));
    const sortedABC = updatedABC.sort(() => Math.random() - 0.5);
    return sortedABC;
  } else if (topic == "EMOJIS") {
    const slicedArray = EMOJIS.slice(0, newnum);
    const concatedEMOJIS = slicedArray.concat(slicedArray);
    const updatedEMOJIS = concatedEMOJIS.map((ele, i) => ({ ...ele, id: i }));
    const sortedEMOJIS = updatedEMOJIS.sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedEMOJIS];
  } else if (topic == "NUM") {
    const NUMSArray = [];
    for (let i = 0; i < newnum; i++) {
      NUMSArray.push(Math.floor(Math.random() * 100));
    }
    const concatedNum = NUMSArray.concat(NUMSArray);
    const updatedNum = concatedNum.map((ele, i) => ({ value: ele, id: i }));
    const sortedNum = updatedNum.sort(() => {
      return Math.random() - 0.5;
    });
    // console.log(sortedNum);
    return [...sortedNum];
  } else if (topic == "SHAPES") {
    const slicedArray = SHAPES.slice(0, newnum);
    const concatedSHAPES = slicedArray.concat(slicedArray);
    const updatedSHAPES = concatedSHAPES.map((ele, i) => ({ ...ele, id: i }));
    const sortedSHAPES = updatedSHAPES.sort(() => {
      return Math.random() - 0.5;
    });
    return [...sortedSHAPES];
  }
}
