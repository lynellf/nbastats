import type { WeightedPlayerData } from 'nba-greatest-players-list'

type LoadChunk = () => Promise<WeightedPlayerData[]>

export const loadChunk24: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-24'
  ).then((mod) => mod.default)

export const loadChunk23: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-23'
  ).then((mod) => mod.default)

export const loadChunk22: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-22'
  ).then((mod) => mod.default)

export const loadChunk21: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-21'
  ).then((mod) => mod.default)

export const loadChunk20: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-20'
  ).then((mod) => mod.default)

export const loadChunk19: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-19'
  ).then((mod) => mod.default)

export const loadChunk18: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-18'
  ).then((mod) => mod.default)

export const loadChunk17: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-17'
  ).then((mod) => mod.default)

export const loadChunk16: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-16'
  ).then((mod) => mod.default)

export const loadChunk15: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-15'
  ).then((mod) => mod.default)

export const loadChunk14: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-14'
  ).then((mod) => mod.default)

export const loadChunk13: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-13'
  ).then((mod) => mod.default)

export const loadChunk12: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-12'
  ).then((mod) => mod.default)

export const loadChunk11: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-11'
  ).then((mod) => mod.default)

export const loadChunk10: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-10'
  ).then((mod) => mod.default)

export const loadChunk9: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-9'
  ).then((mod) => mod.default)

export const loadChunk8: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-8'
  ).then((mod) => mod.default)

export const loadChunk7: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-7'
  ).then((mod) => mod.default)

export const loadChunk6: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-6'
  ).then((mod) => mod.default)

export const loadChunk5: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-5'
  ).then((mod) => mod.default)

export const loadChunk4: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-4'
  ).then((mod) => mod.default)

export const loadChunk3: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-3'
  ).then((mod) => mod.default)

export const loadChunk2: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-2'
  ).then((mod) => mod.default)

export const loadChunk1: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-1'
  ).then((mod) => mod.default)

export const loadChunk0: LoadChunk = async () =>
  await import(
    // @ts-ignore
    'nba-greatest-players-list/lib/weighted-chunked/weighted-players-0'
  ).then((mod) => mod.default)

const setIndex = (index: number) => {
  return (newIndex: number) => {
    const isInRange = newIndex >= 0 && newIndex <= 24
    return isInRange ? (index = newIndex) : index
  }
}

type GetState = () => number
const getChunkCB = (callbacks: LoadChunk[], getState: GetState) => {
  return () => {
    const index = getState()
    return callbacks[index]()
  }
}

type GetChunk = () => Promise<WeightedPlayerData[]>
type UpdateIndex = (newIndex: number) => void
const createJumpTo = (
  updateIndex: UpdateIndex,
  getChunk: GetChunk,
  getIndex: () => number
) => {
  return (incBy: number) => () => {
    const currentIndex = getIndex()
    const newIndex = currentIndex + incBy
    updateIndex(newIndex)
    console.log({ currentIndex, newIndex })
    return getChunk()
  }
}

function ChunkIndex(index = 24) {
  const setState = (newIndex: number) => {
    index = setIndex(index)(newIndex)
  }
  const getState = () => index
  return { setIndex: setState, getIndex: getState }
}

export default function Chunk(index = 24) {
  const { setIndex, getIndex } = ChunkIndex(index)

  const chunks = [
    loadChunk0,
    loadChunk1,
    loadChunk2,
    loadChunk3,
    loadChunk4,
    loadChunk5,
    loadChunk6,
    loadChunk7,
    loadChunk8,
    loadChunk9,
    loadChunk10,
    loadChunk11,
    loadChunk12,
    loadChunk13,
    loadChunk14,
    loadChunk15,
    loadChunk16,
    loadChunk17,
    loadChunk18,
    loadChunk19,
    loadChunk20,
    loadChunk21,
    loadChunk22,
    loadChunk23,
    loadChunk24
  ]

  const getChunk = getChunkCB(chunks, getIndex)
  const jumpTo = createJumpTo(setIndex, getChunk, getIndex)

  const next = jumpTo(-1)
  const prev = jumpTo(1)
  const current = jumpTo(0)

  const at = (newIndex: number) => {
    setIndex(newIndex)
    return getChunk()
  }

  return { prev, next, at, current }
}
