import { useCallback, useEffect, useRef, useState } from 'react'

type SoundType = 'fileOpen' | 'tabSwitch' | 'commandExecute' | 'folderToggle' | 'themeToggle' | 'error'

const STORAGE_KEY = 'afnan-portfolio-sounds'

// Generate short click/bleep sounds using Web Audio API
function createAudioContext() {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
}

function playSound(ctx: AudioContext, type: SoundType) {
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  // Different sound profiles for different actions
  const profiles: Record<SoundType, { freq: number; duration: number; type: OscillatorType; volume: number }> = {
    fileOpen: { freq: 880, duration: 0.05, type: 'sine', volume: 0.1 },
    tabSwitch: { freq: 660, duration: 0.04, type: 'sine', volume: 0.08 },
    commandExecute: { freq: 440, duration: 0.06, type: 'square', volume: 0.06 },
    folderToggle: { freq: 550, duration: 0.03, type: 'triangle', volume: 0.07 },
    themeToggle: { freq: 770, duration: 0.08, type: 'sine', volume: 0.1 },
    error: { freq: 220, duration: 0.1, type: 'sawtooth', volume: 0.08 },
  }

  const profile = profiles[type]
  oscillator.type = profile.type
  oscillator.frequency.setValueAtTime(profile.freq, ctx.currentTime)
  gainNode.gain.setValueAtTime(profile.volume, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + profile.duration)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + profile.duration)
}

export function useAudio() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'true'
  })

  const audioContextRef = useRef<AudioContext | null>(null)

  // Resume audio context on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = createAudioContext()
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  // Persist enabled state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled))
  }, [enabled])

  const play = useCallback((type: SoundType) => {
    if (!enabled) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = createAudioContext()
      }

      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      playSound(ctx, type)
    } catch {
      // Audio not supported or blocked
    }
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev)
    return !enabled
  }, [enabled])

  return { play, toggle, enabled }
}
