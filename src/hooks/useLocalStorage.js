import { useState, useEffect } from 'react'

/**
 * Behaves like useState but reads/writes to localStorage.
 * On mount, attempts to parse the stored JSON; falls back to initialValue.
 * On every state update, the new value is serialised and persisted.
 *
 * @param {string} key          - localStorage key
 * @param {*}      initialValue - used when no stored value exists
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn('[useLocalStorage] Failed to persist:', err)
    }
  }, [key, value])

  return [value, setValue]
}
