import type { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { PlayerContext } from '../context/PlayerProvider'
import { useContext, useEffect, useState } from 'react'
import useScroll from './useScroll'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import type { WeightedPlayerData } from 'nba-greatest-players-list'
import chunkedList from '../data/chunks'

const checkViewport = <T>(...args: T[]) => console.log(args)
const updateViewArr = <T>(...args: T[]) => console.log(args)

const loadNext = <T>(...args: T[]) => console.log(args)
const loadPrev = <T>(...args: T[]) => console.log(args)

type Context = [number, number] // [start, end]
type ChunkNav = () => Promise<void>
type SetRange = Dispatch<SetStateAction<Context>>

const every = (...bools: boolean[]) => bools.every(Boolean)

type STATE_IDLE = 'idle'
type STATE_SCROLLING = 'scrolling'
type STATE_LOADING = 'loading'
type STATE_ERROR = 'error'

// actions in scroll state
// checkViewport, updateViewArr

// actions in loading state

const scrollMachine = createMachine({
  id: 'scroll',
  initial: 'init',
  states: {
    init: {
      on: {
        READY: 'idle'
      }
    },
    idle: {
      on: {
        SCROLL: 'scrolling'
      }
    },
    cooldown: {
      after: {
        3000: 'idle'
      }
    },
    scrolling: {
      on: {
        REST: 'idle',
        SCROLL: 'scrolling',
        LOAD_NEXT_CHUNK: 'loadingNextChunk',
        LOAD_PREV_CHUNK: 'loadingPrevChunk'
      },
      after: {
        1000: { target: 'idle' }
      }
    },
    slicingDown: {
      on: {
        DONE: 'idle'
      }
    },
    loadingNextChunk: {
      on: {
        SLICE_DOWN: 'cooldown',
        ERROR: 'error'
      }
    },
    loadingPrevChunk: {
      on: {
        DONE: 'idle',
        ERROR: 'error'
      }
    },
    error: {
      on: {
        CLOSE_PROMPT: 'idle'
      }
    }
  }
})

type ViewSlice = {
  start: number
  end: number
  sliceSize: number
  setRange: SetRange
  chunkSize: number
  chunkNav: ChunkNav
}

type Send = (event: any) => void

function getLocationValues() {
  var currentLocation = window.scrollY
  var visibleArea = window.innerHeight
  var totalDocHeight = document.body.clientHeight
  var documentHeight = totalDocHeight - visibleArea
  return { currentLocation, documentHeight, visibleArea, totalDocHeight }
}

function getScrollHandler(send: Send) {
  return () => {
    send({ type: 'SCROLL' })
  }
}

function getPositionChecker(
  send: Send,
  setRange: SetRange,
  sliceSize: number,
  [start, end]: Context,
  prevY: MutableRefObject<number>
) {
  return () => {
    const { currentLocation, documentHeight } = getLocationValues()
    const isInLowestQuarter = (currentLocation / documentHeight) * 100 >= 75
    const canSliceDown = start - sliceSize >= 0
    const isMovingDown = currentLocation > prevY.current

    if (every(isInLowestQuarter, isMovingDown)) {
      console.log('loading next chunk')
      // send({ type: 'SLICE_DOWN' })
      send({ type: 'LOAD_NEXT_CHUNK' })
    }

    // if (every(!canSliceDown, isInLowestQuarter, isMovingDown)) {
    //   send({ type: 'LOAD_NEXT_CHUNK' })
    // }
  }
}

type UseInit = {
  state: any
  currentChunk: WeightedPlayerData[]
  sliceSize: number
  setRange: SetRange
  send: Send
}
function useInit({ state, currentChunk, sliceSize, setRange, send }: UseInit) {
  useEffect(() => {
    const isInit = state.value === 'init'
    const hasData = currentChunk.length > 0

    if (every(isInit, hasData)) {
      const newEnd = currentChunk.length
      const newStart = newEnd - sliceSize
      setRange([newStart, newEnd])
      send({ type: 'READY' })
    }
  }, [state.value, currentChunk, sliceSize])
}

function usePositionCheck(state: any, checkPosition: () => void) {
  useEffect(() => {
    if (state.value === 'scrolling') {
      checkPosition()
    }
  }, [state.value, checkPosition])
}

export default function usePlayerView() {
  const {
    prev,
    next,
    currentChunk,
    sliceSize,
    state: appState
  } = useContext(PlayerContext)
  const [state, send] = useMachine(scrollMachine)
  const [[start, end], setRange] = useState<Context>([0, 0])
  const handleScroll = getScrollHandler(send)
  const { prevY } = useScroll(handleScroll)
  const checkPosition = getPositionChecker(
    send,
    setRange,
    sliceSize,
    [start, end],
    prevY
  )

  useInit({ state, currentChunk, sliceSize, setRange, send })
  usePositionCheck(state, checkPosition)

  useEffect(() => {
    console.log({ state: state.value, appState })
    if (every(state.value === 'loadingNextChunk', appState !== 'loading')) {
      next()
        .then(() => {
          send({ type: 'SLICE_DOWN' })
        })
        .catch(() => {
          send({ type: 'ERROR' })
        })
    }
  }, [state.value, appState, currentChunk])

  useEffect(() => {
    if (state.value === 'slicingDown') {
      const currentLen = currentChunk.length
      setRange([0, currentLen])
      send({ type: 'DONE' })
    }
  }, [state.value, currentChunk, sliceSize, setRange])

  useEffect(() => {
    console.log(state.value)
  }, [state.value])

  return { currentChunk, start, end }
}
