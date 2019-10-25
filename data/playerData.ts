import { playerList } from "./players"

function getStats(...nums: number[]) {
  const { length } = nums
  const sum = nums.reduce((a, b) => a + b)
  const mean = sum / length
  const median = nums[Math.round(length / 2)]
  return { mean, median, sum }
}

export const playerData = playerList.map(player => {
  const {
    0: name,
    1: position,
    2: age,
    3: team,
    4: gamesPlayed,
    5: minutesPlayed,
    6: minutesPerGame,
    7: playerEfficency,
    8: winShares,
    9: winSharesPer48,
    10: oBoxPlusMinus,
    11: dBoxPlusMinus,
    12: boxPlusMinus,
    13: valueOverReplacement,
    14: rPlusMinus,
    15: rPlusMinusWins,
    16: playerSalary
  } = player

  return {
    age: age as number,
    boxPlusMinus: boxPlusMinus as number,
    dBoxPlusMinus: dBoxPlusMinus as number,
    gamesPlayed: gamesPlayed as number,
    minutesPerGame: Number(minutesPerGame),
    minutesPlayed: minutesPlayed as number,
    name: name as string,
    oBoxPlusMinus: oBoxPlusMinus as number,
    playerEfficiency: playerEfficency as number,
    playerSalary: playerSalary as number,
    position: (position as string).toLowerCase(),
    rPlusMinus: rPlusMinus as number,
    rPlusMinusWins: rPlusMinusWins as number,
    team: (team as string).toLowerCase(),
    valueOverReplacement: valueOverReplacement as number,
    winShares: winShares as number,
    winSharesPer48: winSharesPer48 as number
  }
})

const teamNames = [...new Set(playerData.map(player => player.team))]

type TeamOutput = {
  name: string,
  roster: typeof playerData
  averages: Partial<typeof playerData[0]>
  totals: Partial<typeof playerData[0]>
}

// const teams = teamNames.map(team => {
//   const teamRoster = playerData.filter(player => player.team === team)
//   const ageStats = teamRoster.
// })
