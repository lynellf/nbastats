import type { WeightedPlayerData } from 'nba-greatest-players-list'
import { chunkedIndex } from 'nba-greatest-players-list'
import { Radar } from 'react-chartjs-2'
import styles from '../styles/PlayerView.module.css'
import Select from 'react-select'
import usePlayerView from '../hooks/usePlayerView'

function formatName(name: string) {
  return name.split(', ').reverse().join(' ')
}

function parseYTUrl(url: string) {
  return url.split('https://youtube.com/watch?v=')?.[1] ?? ''
}

function scoreToTier(score: number) {
  const isA = score > 2
  const isB = score > 1
  const isC = score > 0
  const isD = score > -1

  if (isA) return 'A'
  if (isB) return 'B'
  if (isC) return 'C'
  if (isD) return 'D'
  return 'F'
}

const baseYTUrl = 'https://www.youtube.com/embed/'

const options = chunkedIndex.map(({ name, chunk }) => ({
  value: `${name}/${chunk}`,
  label: name
}))

export default function PlayerView() {
  const { currentChunk, start, end } = usePlayerView()
  const slice = currentChunk.reverse()

  return (
    <div>
      <Select options={options} />
      {slice.map((player, index) => (
        <div key={index}>
          <h2 className={styles.name}>{`${formatName(player.name)}`}</h2>
          <div className={styles.layout}>
            <div>
              <h3>Career Highlights</h3>
              <iframe
                src={`${baseYTUrl}${parseYTUrl(player.youtubeURL)}`}
                frameBorder="0"
              />
            </div>
            <div>
              <h3>Player Bio</h3>
              {player.imageUrl && (
                <div>
                  <img
                    src={player.imageUrl}
                    alt={`${formatName(player.name)} profile picture`}
                  />
                </div>
              )}
              <p>{player.description}</p>
              <div>
                <strong>Born: </strong>
                <span>{player.born}</span>
              </div>
              {player.died && (
                <div>
                  <strong>Died: </strong>
                  <span>{player.died}</span>
                </div>
              )}

              <div>
                <strong>Height: </strong>
                <span>{player.height}</span>
              </div>

              {player.education && (
                <div>
                  <strong>Education: </strong>
                  <span>{player.education}</span>
                </div>
              )}
            </div>
            <div>
              <h3>Stats Overview</h3>
              <Radar
                data={{
                  labels: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'],
                  datasets: [
                    {
                      data: [
                        player.scoringTitles,
                        player.reboundingTitles,
                        player.assistTitles,
                        player.stealsTitles,
                        player.blocksTitles
                      ]
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
            <div>
              <h3>Career Rankings</h3>
              <div className={styles['career-table']}>
                <div className={styles['career-table-row']}>
                  <strong>Games Played</strong>
                  <strong>Win Shares Per 48</strong>
                  <strong>Points</strong>
                  <strong>Assists</strong>
                  <strong>Rebounding</strong>
                  <strong>Steals</strong>
                  <strong>Blocks</strong>
                  <strong>All-Star Selections</strong>
                  <strong>MVP Votes</strong>
                  <strong>NBA All-Team</strong>
                  <strong>NBA All-Defense</strong>
                  <strong>NBA DPOY</strong>
                  <strong>NBA ROTY</strong>
                  <strong>Championships</strong>
                  <strong>Finals MVPs</strong>
                </div>
                <div className={styles['career-table-row']}>
                  <span>{scoreToTier(player.gamesPlayed)}</span>
                  <span>{scoreToTier(player.winSharesPer48)}</span>
                  <span>{scoreToTier(player.scoringTitles)}</span>
                  <span>{scoreToTier(player.assistTitles)}</span>
                  <span>{scoreToTier(player.reboundingTitles)}</span>
                  <span>{scoreToTier(player.stealsTitles)}</span>
                  <span>{scoreToTier(player.blocksTitles)}</span>
                  <span>{scoreToTier(player.allStarSelections)}</span>
                  <span>{scoreToTier(player.mvpPlacements)}</span>
                  <span>{scoreToTier(player.allTeamPlacements)}</span>
                  <span>{scoreToTier(player.allDefensePlacements)}</span>
                  <span>{scoreToTier(player.dpoys)}</span>
                  <span>{scoreToTier(player.roty)}</span>
                  <span>{scoreToTier(player.championships)}</span>
                  <span>{scoreToTier(player.championshipMvps)}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Related Links</h3>
            <ul>
              {player.relatedLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
