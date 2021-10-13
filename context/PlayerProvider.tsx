import type { WeightedPlayerData } from 'nba-greatest-players-list'
import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState, useEffect } from 'react'
import { weightedChunkedIndex } from 'nba-greatest-players-list'
import chunkedList from '../data/chunks'

type Context = {
  playerDirectory: typeof weightedChunkedIndex
  currentChunk: WeightedPlayerData[]
  state: 'init' | 'loading' | 'error' | 'idle'
}

export type SetContext = Dispatch<SetStateAction<Context>>

const initialCtx: Context = {
  state: 'init',
  currentChunk: [],
  playerDirectory: weightedChunkedIndex
}

const placeholderAt = async (query: string) => console.log(query)
const placeholderNav = async () => console.log()

export const PlayerContext = createContext({
  ...initialCtx,
  findChunk: placeholderAt,
  next: placeholderNav,
  prev: placeholderNav,
  sliceSize: 1
})

type LoadChunk = () => Promise<WeightedPlayerData[]>
function loadChunk(
  setCtx: SetContext,
  method: LoadChunk,
  type: 'append' | 'prepend' | 'replace'
) {
  return async () => {
    setCtx((ctx) => ({ ...ctx, state: 'loading' }))

    const currentChunk = await method()

    if (type === 'append') {
      setCtx((ctx) => ({
        ...ctx,
        currentChunk: [...ctx.currentChunk, ...currentChunk],
        state: 'idle'
      }))
    }

    if (type === 'prepend') {
      setCtx((ctx) => ({
        ...ctx,
        currentChunk: [...currentChunk, ...ctx.currentChunk],
        state: 'idle'
      }))
    }

    if (type === 'replace') {
      setCtx((ctx) => ({
        ...ctx,
        currentChunk,
        state: 'idle'
      }))
    }
  }
}

type At = (index: number) => Promise<WeightedPlayerData[]>
type PlayerDir = typeof weightedChunkedIndex
function chunkSearch(at: At, playerDir: PlayerDir, setCtx: SetContext) {
  return async (playerName: string) => {
    const matchedPlayer = playerDir.find((player) => player.name === playerName)
    if (matchedPlayer) {
      const { chunk } = matchedPlayer
      setCtx((ctx) => ({ ...ctx, state: 'loading' }))

      const currentChunk = await at(chunk)

      setCtx((ctx) => ({
        ...ctx,
        currentChunk,
        state: 'idle'
      }))
    }
  }
}

type SliceSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Props = { children: JSX.Element; sliceSize: SliceSize }

export default function PlayerProvider({ children, sliceSize = 1 }: Props) {
  const [ctx, setCtx] = useState(initialCtx)
  const { current, next, prev, at } = chunkedList()

  const findChunk = chunkSearch(at, ctx.playerDirectory, setCtx)
  const nextChunk = loadChunk(setCtx, next, 'append')
  const prevChunk = loadChunk(setCtx, prev, 'append')

  useEffect(() => {
    if (ctx.state === 'init') {
      const getCurrentChunk = loadChunk(setCtx, current, 'append')
      getCurrentChunk()
    }
  }, [ctx.state])

  return (
    <PlayerContext.Provider
      value={{ ...ctx, next: nextChunk, prev: prevChunk, findChunk, sliceSize }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
