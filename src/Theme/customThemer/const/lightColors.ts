interface obj {
  cName: string;
  color: string;
}
interface colorsSet {
  theme: string;
  colors: obj[];
}

export const lightColors: colorsSet = {
  theme: "light",
  colors: [
    { cName: "softpastels", color: "#a89e47,#f2a7b2" },
    { cName: "earthytones", color: "#7e702a,#9f9a6d" },
    { cName: "vibrantcontrast", color: "#e96f35,#3e8e41" },
    { cName: "mutedblues", color: "#5979b1,#a2c8e3" },
    { cName: "warmsunset", color: "#c49f68,#db5c4d" },
  ],
};
