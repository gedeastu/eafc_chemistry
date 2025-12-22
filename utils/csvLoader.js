import fs from "fs";

function loadCSV(path) {
  const rows = fs.readFileSync(path, "utf-8")
    .trim()
    .split("\n");

  const headers = rows.shift().split(",");

  return rows
    .filter(r => r.trim() !== "")
    .map(r => {
      const values = r.split(",");
      const obj = {};

      headers.forEach((h, i) => {
        const key = h.trim();
        const value = values[i]?.trim();
        obj[key] = value;
      });

      obj.Id = Number(obj.Id);
      return obj;
    });
}


export const playersByPosition = {
  GK: loadCSV("./data/gk.csv"),
  CB: loadCSV("./data/cb.csv"),
  LB: loadCSV("./data/lb.csv"),
  RB: loadCSV("./data/rb.csv"),
  CM: loadCSV("./data/cm.csv"),
  CDM: loadCSV("./data/cdm.csv"),
  CAM: loadCSV("./data/cam.csv"),
  LW: loadCSV("./data/lw.csv"),
  RW: loadCSV("./data/rw.csv"),
  ST: loadCSV("./data/st.csv")
};
