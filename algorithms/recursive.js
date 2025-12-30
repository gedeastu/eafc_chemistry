import { chemistry } from "./chemistry.js";

export function recursive(
  positions,
  candidates
) {
  const best = {
    score: 0,
    squad: []
  };
  function dfs(idx, squad, usedIds) {
    if (idx === positions.length) {
      const score = chemistry(squad);
      if (score > best.score) {
        best.score = score;
        best.squad = [...squad];
      }
      return;
    }

    const pos = positions[idx];
    const list = candidates[pos];
    if (!Array.isArray(list) || list.length === 0) {
      return;
    }
    for (const player of list) {
      if (usedIds.has(player.Id)) continue;

      usedIds.add(player.Id);
      squad.push(player);

      dfs(idx + 1, squad, usedIds);

      squad.pop();
      usedIds.delete(player.Id);
    }
  }

  dfs(0, [], new Set());
  return best;
}
