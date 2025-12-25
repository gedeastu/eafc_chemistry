export function chemistry(squad) {
  let score = 0;
  for (let i = 0; i < squad.length; i++) {
    for (let j = i + 1; j < squad.length; j++) {
      if (squad[i].Club === squad[j].Club) score += 7;
      if (squad[i].Negara === squad[j].Negara) score += 10;
      if (squad[i].Liga === squad[j].Liga) score += 4;
    }
  }
  return score;
}