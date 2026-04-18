import { useState, useCallback } from 'react'

/**
 * Simple toast message hook.
 * Returns the current toast message (null when hidden) and a trigger function.
 *
 * @param {number} duration - how long the toast is visible in ms (default 2200)
 */
export function useToast(duration = 2200) {
  const [message, setMessage] = useState(null)

  const showToast = useCallback((msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), duration)
  }, [duration])

  return { message, showToast }
}
