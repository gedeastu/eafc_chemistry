import { chemistry } from "./chemistry.js";

export function iterative(
  positions,
  candidates
) {
  let best = {
    score: 0,
    squad: []
  };

  const stack = [{
    idx: 0,
    squad: [],
    usedIds: new Set()
  }];

  while (stack.length > 0) {
    const { idx, squad, usedIds } = stack.pop();
    if (idx === positions.length) {
      const score = chemistry(squad);
      if (score > best.score) {
      // console.log("Score: ",score);
      // console.log("Best :  ",best.score);
      // console.log("Squad :  ",squad);
        best = {
          score,
          squad
        };
      }
      continue;
    }else{
      const pos = positions[idx];
      const list = candidates[pos];
      if (!Array.isArray(list) || list.length === 0) {
        continue;
      }
      for (const player of list) {
        if (usedIds.has(player.Id)) continue;

        const newUsed = new Set(usedIds);
        newUsed.add(player.Id);

        stack.push({
          idx: idx + 1,
          squad: [...squad, player],
          usedIds: newUsed
        });
      }
    }
  }
  return best;
}
