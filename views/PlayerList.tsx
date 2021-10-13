import { weightedChunkedIndex as playerlist } from 'nba-greatest-players-list'
import Link from 'next/link'
export default function PlayerList() {
  return (
    <ol>
      {playerlist.reverse().map(({ name, chunk }, index) => (
        <li key={`${index}-${name}`}>
          <Link href={`player/${chunk}/${name.split(', ').join('-')}`}>
            {name}
          </Link>
        </li>
      ))}
    </ol>
  )
}
