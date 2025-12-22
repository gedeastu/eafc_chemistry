import fs from "fs";

const clubs = ["Barcelona", "Real Madrid", "Man City", "Liverpool", "PSG"];
const leagues = ["La Liga", "Premier League", "Ligue 1"];
const nations = ["Spain", "Brazil", "France", "England", "Argentina"];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePlayers(position, count) {
  const players = [];

  for (let i = 1; i <= count; i++) {
    players.push({
      id: `${position}_${i}`,
      name: `${position}_Player_${i}`,
      club: randomFrom(clubs),
      league: randomFrom(leagues),
      nation: randomFrom(nations)
    });
  }

  return players;
}

const DATASET_SIZE = 30;

fs.writeFileSync(
  "./data/json/GK.json",
  JSON.stringify(generatePlayers("GK", DATASET_SIZE), null, 2)
);

fs.writeFileSync(
  "./data/json/DEF.json",
  JSON.stringify(generatePlayers("DEF", DATASET_SIZE), null, 2)
);

fs.writeFileSync(
  "./data/json/MID.json",
  JSON.stringify(generatePlayers("MID", DATASET_SIZE), null, 2)
);

fs.writeFileSync(
  "./data/json/ATT.json",
  JSON.stringify(generatePlayers("ATT", DATASET_SIZE), null, 2)
);

console.log("Dataset JSON berhasil dibuat ✅");
