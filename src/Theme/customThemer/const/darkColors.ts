interface obj {
  cName: string;
  color: string;
}
interface colorsSet {
  theme: string;
  colors: obj[];
}

export const darkColors: colorsSet = {
  theme: "dark",
  colors: [
    { cName: "classicminimal", color: "#8a8a60,#b8b07b" },
    { cName: "deepocean", color: "#4c8a94,#8d9d9f" },
    { cName: "richburgundy", color: "#6e1f32,#9b6b4c" },
    { cName: "tealCopper", color: "#3b7373,#cf7e5e" },
    { cName: "mysticpurple", color: "#5e3f74,#9a7da6" },
  ],
};
