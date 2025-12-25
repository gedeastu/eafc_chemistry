import express from "express";
import cors from "cors";
import { formations } from "./utils/formationsAndPlaystyle.js";
import { backtrackingRecursive } from "./algorithms/recursive.js";
import { backtrackingIterative } from "./algorithms/iterative.js";
import { playersByPosition } from "./utils/csvLoader.js";
import { preselectPlayers } from "./algorithms/preSelectPlayers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/optimize-squad", (req, res) => {
    const { formation: key,jumlahPemainPerPosisi:countPlayer} = req.body;
    const formation = formations[key];

  if (!formation) {
    return res.status(400).json({
      error: "Formasi tidak valid"
    });
  }

  const preselected = preselectPlayers(playersByPosition,formation.tactic,countPlayer);


  const recResult = backtrackingRecursive(
    formation.positions,
    preselected
  );


  const itResult = backtrackingIterative(
    formation.positions,
    preselected
  );

  // res.json({
  //   formation: key,
  //   recResult,
  //   itResult,
  //   jumlahPemainPerPosisi:countPlayer,
  // });
  res.json({
    formation: key,
    jumlahPemainPerPosisi: countPlayer,
    preselectPlayers: {
      total: Object.values(preselected).flat().length,
      table: toTable(Object.values(preselected).flat())
    },
    iterativeResult: {
      chemistry: itResult.score,
      table: toTable(itResult.squad)
    },
    recursiveResult: {
      chemistry: recResult.score,
      table: toTable(recResult.squad)
    }
  });
})
app.listen(3000, () =>
  console.log("API running on http://localhost:3000")
);
function toTable(players) {
  return {
    columns: ["Nama", "Posisi", "Club", "Liga", "Negara", "Instruction"],
    rows: players.map(p => [
      p.NamaPemain,
      p.Posisi,
      p.Club,
      p.Liga,
      p.Negara,
      p.PlayerInstruction
    ])
  };
}

//Terminal Version
// async function main() {
//   const rl = readline.createInterface({ input, output });

//   console.log("Pilih Formasi:");
//   console.log("433 → 4-3-3 (Tiki-Taka)");
//   console.log("4312 → 4-3-1-2 (Kick and Rush)");
//   console.log("4222 → 4-2-2-2 (Gegen Pressing)");
//   console.log("4213 → 4-2-1-3 (Jogo Bonito)");

//   const f = await rl.question("Masukkan formasi: ");
//   const formation = formations[f.trim()];

//   if (!formation) {
//     console.log("Formasi tidak valid");
//     rl.close();
//     return;
//   }

//   console.log("\nFormasi:", formation.name);
//   console.log("Taktik:", formation.tactic);

//   const preselected = preselectPlayers(playersByPosition,formation.tactic,7);
//   console.log("\nPlayers List:");
//   const tableData = Object.values(preselected)
//   .flat()
//   .map(p => ({
//     Nama: p.NamaPemain,
//     Posisi: p.Posisi,
//     Club: p.Club,
//     Instruction: p.PlayerInstruction
//   }))
//   console.table(tableData);


//  console.log("\n=== HASIL RUNNING TIME ===");
//  console.time("Backtracking Recursive");
//   const recResult = backtrackingRecursive(
//     formation.positions,
//     preselected
//   );
//   console.timeEnd("Backtracking Recursive");

//   console.time("Backtracking Iterative");
//   const itResult = backtrackingIterative(
//     formation.positions,
//     preselected
//   );
//   console.timeEnd("Backtracking Iterative");

  
//   console.log("\n=== HASIL ===");
//   console.log("Recursive Chemistry:", recResult.score);
//   console.log("Iterative Chemistry:", itResult.score);

//   console.table(itResult.squad.map(p => ({
//     Nama: p.NamaPemain,
//     Posisi: p.Posisi,
//     Club: p.Club,
//     Negara: p.Negara,
//     Instruction: p.PlayerInstruction
//   })));

//   rl.close();
// }

