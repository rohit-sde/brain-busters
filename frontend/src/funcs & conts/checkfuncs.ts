import { indianGirlsNamesByLetter } from "./conts";

function isNameOfGirl(nam: string): boolean {
  const mnam = nam.toLowerCase();
  const firstLetter = mnam.charAt(0);

  return indianGirlsNamesByLetter[firstLetter].has(mnam);
}

export { isNameOfGirl };
