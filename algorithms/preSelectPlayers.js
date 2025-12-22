import { tacticPreference } from "../utils/formationsAndPlaystyle.js";

export function preselectPlayers(allPlayers, tactic, limit = 5) {
  const selected = {};

  for (const pos in allPlayers) {
    const pref = tacticPreference[tactic]?.[pos];
    let candidates = allPlayers[pos];

    if (Array.isArray(pref) && pref.length > 0) {
      const filtered = allPlayers[pos]
        .filter(p => pref.includes(p.PlayerInstruction));
      candidates = filtered.length > 0 ? filtered : candidates;
    }

    selected[pos] = candidates.slice(0, limit);
  }

  return selected;
}