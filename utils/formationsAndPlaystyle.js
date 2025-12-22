export const formations = {
  "433": {
    name: "4-3-3",
    tactic: "Tiki-Taka",
    positions: ["GK","LB","CB","CB","RB","CM","CM","CAM","LW","RW","ST"]
  },
  "4312": {
    name: "4-3-1-2",
    tactic: "Kick and Rush",
    positions: ["GK","LB","CB","CB","RB","CDM","CM","CM","CAM","ST","ST"]
  },
  "4222": {
    name: "4-2-2-2",
    tactic: "Gegen Pressing",
    positions: ["GK","LB","CB","CB","RB","CDM","CDM","CM","CM","ST","ST"]
  },
  "4213": {
    name: "4-2-1-3",
    tactic: "Jogo Bonito",
    positions: ["GK","LB","CB","CB","RB","CDM","CM","CAM","LW","RW","ST"]
  }
};

export const tacticPreference = {
  "Tiki-Taka": {
    GK: ["Sweeper Keeper","Ball Playing Goalkeeper"],
    CB: ["Ball Playing Defender","Stopper"],
    LB: ["Attacking Wing Back","Wingback"],
    RB: ["Attacking Wing Back","Wingback"],
    CM: ["Playmaker","Deep Lying Playmaker"],
    CAM:["Classic 10","Playmaker"],
    LW: ["Wide Playmaker","Inside Forward"],
    RW: ["Wide Playmaker","Inside Forward"],
    ST: ["False 9"]
  },
  "Kick and Rush": {
    GK: ["Sweeper Keeper","Ball Playing Goalkeeper"],
    CB: ["Ball Playing Defender","Stopper"],
    LB: ["Attacking Wing Back","Wingback"],
    RB: ["Attacking Wing Back","Wingback"],
    CM: ["Box To Box","Deep Lying Playmaker"],
    CAM: ["Shadow Striker","Playmaker"],
    CDM: ["Holding","Centre Half"],
    ST: ["Advanced Forward"]
  },
  "Gegen Pressing": {
    GK: ["Sweeper Keeper","Ball Playing Goalkeeper"],
    CB: ["Ball Playing Defender","Stopper"],
    LB: ["Attacking Wing Back","Wingback"],
    RB: ["Attacking Wing Back","Wingback"],
    CDM: ["Box To Box","Centre Half"],
    CM: ["Half Winger"],
    ST: ["Advanced Forward"]
  },
  "Jogo Bonito": {
    GK: ["Sweeper Keeper","Ball Playing Goalkeeper"],
    CB: ["Ball Playing Defender","Stopper"],
    LB: ["Attacking Wing Back","Wingback"],
    RB: ["Attacking Wing Back","Wingback"],
    CDM: ["Box To Box","Centre Half"],
    CM: ["Box To Box"],
    CAM:["Classic 10","Playmaker"],
    LW: ["Wide Playmaker","Inside Forward"],
    RW: ["Wide Playmaker","Inside Forward"],
    ST: ["Advanced Forward"]
  }
};