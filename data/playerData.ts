import { playerList } from './players'
import { getDescriptiveStats, getZScore } from '../math/stats'

const teamColors = {
  BOS: '#007A33',
  BRK: '#000000',
  CHI: '#BA0C2F',
  CHO: '#00778B',
  CLE: '#6F263D',
  DAL: '#003DA5',
  DEN: '#418FDE',
  DET: '#B0B1B5',
  GSW: '#FFC72C',
  HOU: '#BA0C2F',
  IND: '#041E42',
  LAC: '#006BB6',
  LAL: '#582C83',
  MEM: '#CED9E5',
  MIA: '#FFA300',
  MIN: '#7AC143',
  NOP: '#85714D',
  NYK: '#FF671F',
  OKC: '#0072CE',
  ORL: '#0057B8',
  PHI: '#003DA5',
  PHO: '#201747',
  POR: '#C4CED4',
  SAC: '#582C83',
  SAS: '#000000',
  TOR: '#BA0C2F',
  TOT: '#fff',
  UTA: '#0C2340',
  WAS: '#0C2340'
} as const

type GetStatsArgs = {
  players: typeof playerData
  categories: CategoryOptions[]
}
function getStats({ players, categories }: GetStatsArgs) {
  const base = {} as {
    [C in CategoryOptions]: ReturnType<typeof getDescriptiveStats>
  }
  const teamStats = categories.reduce((output, category) => {
    const results = players.reduce(
      (result, player) => {
        const categoryExists = result.hasOwnProperty(category)
        const stat = player[category]
        if (!categoryExists) {
          result[category] = [stat]
        }

        result[category] = [...result[category], stat]
        return result
      },
      {} as { [C in CategoryOptions]: number[] }
    )

    const statArr = results[category]
    const stats = { ...getDescriptiveStats(...statArr) }
    output[category] = stats
    return output
  }, base)
  return teamStats
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
    bgColor: teamColors[team as string] as string,
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

export const teamData = teamNames.map(team => {
  const teamRoster = playerData.filter(player => player.team === team)
  const teamStats = getStats({
    players: teamRoster,
    categories: [
      'age',
      'boxPlusMinus',
      'dBoxPlusMinus',
      'gamesPlayed',
      'minutesPlayed',
      'minutesPerGame',
      'oBoxPlusMinus',
      'playerEfficiency',
      'playerSalary',
      'rPlusMinus',
      'rPlusMinusWins',
      'valueOverReplacement',
      'winShares',
      'winSharesPer48'
    ]
  })
  const output = { teamStats, teamRoster }
  return output
})

const purePlayerData = playerData.filter(
  player => player.team !== 'TOT' && player.minutesPlayed >= 1500
)

export const leagueWinShares = getStats({
  players: purePlayerData,
  categories: ['winSharesPer48']
})

const winshareArr = purePlayerData.map(player => player.winSharesPer48)
const salaryArr = purePlayerData.map(player => player.playerSalary)
export const winShareZScores = purePlayerData.map(player => {
  const { team, winSharesPer48, name, bgColor } = player
  const zScore = getZScore(winshareArr, winSharesPer48)
  return { team, winSharesPer48, name, zScore, bgColor }
})
export const salaryZScores = purePlayerData.map(player => {
  const { team, playerSalary, name, bgColor } = player
  const zScore = getZScore(salaryArr, playerSalary)
  return { team, name, bgColor, zScore, playerSalary }
})

type CategoryOptions =
  | 'age'
  | 'boxPlusMinus'
  | 'dBoxPlusMinus'
  | 'gamesPlayed'
  | 'minutesPlayed'
  | 'minutesPerGame'
  | 'oBoxPlusMinus'
  | 'playerEfficiency'
  | 'playerSalary'
  | 'rPlusMinus'
  | 'rPlusMinusWins'
  | 'valueOverReplacement'
  | 'winShares'
  | 'winSharesPer48'

export type PlayerData = typeof playerData
export type TeamData = typeof teamData
