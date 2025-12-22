import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { formations } from "./utils/formationsAndPlaystyle.js";
import { backtrackingRecursive } from "./algorithms/recursive.js";
import { backtrackingIterative } from "./algorithms/iterative.js";
import { playersByPosition } from "./utils/csvLoader.js";
import { preselectPlayers } from "./algorithms/preSelectPlayers.js";

async function main() {
  const rl = readline.createInterface({ input, output });

  console.log("Pilih Formasi:");
  console.log("433 → 4-3-3 (Tiki-Taka)");
  console.log("4312 → 4-3-1-2 (Kick and Rush)");
  console.log("4222 → 4-2-2-2 (Gegen Pressing)");
  console.log("4213 → 4-2-2-2 (Jogo Bonito)");

  const f = await rl.question("Masukkan formasi: ");
  const formation = formations[f.trim()];

  if (!formation) {
    console.log("Formasi tidak valid");
    rl.close();
    return;
  }

  console.log("\nFormasi:", formation.name);
  console.log("Taktik:", formation.tactic);

  const preselected = preselectPlayers(playersByPosition,formation.tactic,6);
  console.log("\nPlayers List:");
  const tableData = Object.values(preselected)
  .flat()
  .map(p => ({
    Nama: p.NamaPemain,
    Posisi: p.Posisi,
    Club: p.Club,
    Instruction: p.PlayerInstruction
  }))
  console.table(tableData);


 console.log("\n=== HASIL RUNNING TIME ===");
 console.time("Backtracking Recursive");
  const recResult = backtrackingRecursive(
    formation.positions,
    preselected
  );
  console.timeEnd("Backtracking Recursive");

  console.time("Backtracking Iterative");
  const itResult = backtrackingIterative(
    formation.positions,
    preselected
  );
  console.timeEnd("Backtracking Iterative");

  
  console.log("\n=== HASIL ===");
  console.log("Recursive Chemistry:", recResult.score);
  console.log("Iterative Chemistry:", itResult.score);

  console.table(itResult.squad.map(p => ({
    Nama: p.NamaPemain,
    Posisi: p.Posisi,
    Club: p.Club,
    Negara: p.Negara,
    Instruction: p.PlayerInstruction
  })));

  rl.close();
}

main();

