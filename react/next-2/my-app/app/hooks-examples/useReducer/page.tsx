'use client'

import { useReducer } from 'react'
import ChapterLayout from '../components/ChapterLayout'

interface CounterState {
  count: number
  step: number
}

type CounterAction = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' } | { type: 'setStep'; payload: number }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step }
    case 'decrement': return { ...state, count: state.count - state.step }
    case 'reset': return { ...state, count: 0 }
    case 'setStep': return { ...state, step: action.payload }
    default: return state
  }
}

export default function UseReducerPage() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 })

  return (
    <ChapterLayout 
      title="useReducer Hook - Complex State Management"
      chapterNumber={7}
      description="Manage complex state with the reducer pattern"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded">
          <h2 className="text-2xl font-bold text-pink-900 mb-3">What is useReducer?</h2>
          <p className="text-gray-700">useReducer is like useState but for complex state logic. It follows the Redux pattern.</p>
        </div>
        <div className="border-2 border-pink-300 rounded-lg p-6 bg-pink-50">
          <p className="text-2xl font-bold mb-3">Count: {state.count}</p>
          <p className="mb-3">Step: {state.step}</p>
          <div className="space-x-2 mb-3">
            <button onClick={() => dispatch({ type: 'increment' })} className="px-4 py-2 bg-blue-500 text-white rounded">
              +{state.step}
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })} className="px-4 py-2 bg-red-500 text-white rounded">
              -{state.step}
            </button>
            <button onClick={() => dispatch({ type: 'reset' })} className="px-4 py-2 bg-gray-500 text-white rounded">
              Reset
            </button>
          </div>
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
            className="border p-2 rounded"
            min="1"
          />
        </div>
      </div>
    </ChapterLayout>
  )
}

