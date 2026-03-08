"use client"

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react"

type AudioContextType = {
  startMusic: () => void
  stopMusic: () => void
  toggleMute: () => void
  muted: boolean
  /** Reproduce un efecto de sonido; la música se pausa mientras suena. onEnd se llama al terminar. */
  playSfx: (src: string, onEnd?: () => void) => void
  /** Cambia la música de fondo por otra pista (ej. tensión). */
  changeMusic: (src: string) => void
  /** Restaura la música original del cuento. */
  restoreMusic: () => void
}

const AudioCtx = createContext<AudioContextType | null>(null)

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>")
  return ctx
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const altMusicRef = useRef<HTMLAudioElement | null>(null)
  const sfxRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)
  const mutedRef = useRef(false)
  const musicStartedRef = useRef(false)

  // Crear el elemento de música una sola vez
  useEffect(() => {
    const audio = new Audio("/sounds/musica_cuento.mp3.mp3")
    audio.loop = true
    audio.volume = 0.35
    musicRef.current = audio

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const startMusic = useCallback(() => {
    const music = musicRef.current
    if (!music || musicStartedRef.current) return
    musicStartedRef.current = true
    music.currentTime = 0
    music.play().catch(() => {
      // Autoplay bloqueado — se intentará de nuevo con interacción del usuario
    })
  }, [])

  const stopMusic = useCallback(() => {
    const music = musicRef.current
    if (!music) return
    music.pause()
    music.currentTime = 0
    musicStartedRef.current = false
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      mutedRef.current = next
      const music = musicRef.current
      if (music) music.muted = next
      const alt = altMusicRef.current
      if (alt) alt.muted = next
      return next
    })
  }, [])

  const playSfx = useCallback((src: string, onEnd?: () => void) => {
    const music = musicRef.current
    const alt = altMusicRef.current

    // Pausar la música activa mientras suena el SFX
    if (alt && !alt.paused && !alt.muted) {
      alt.pause()
    } else if (music && !music.paused && !music.muted) {
      music.pause()
    }

    // Si ya hay un SFX sonando, pararlo
    if (sfxRef.current) {
      sfxRef.current.pause()
      sfxRef.current.src = ""
    }

    const sfx = new Audio(src)
    sfx.volume = 0.7
    sfxRef.current = sfx

    sfx.addEventListener("ended", () => {
      // Reanudar la música activa cuando termina el SFX
      if (!mutedRef.current && musicStartedRef.current) {
        const activeAlt = altMusicRef.current
        if (activeAlt) {
          activeAlt.play().catch(() => {})
        } else if (music) {
          music.play().catch(() => {})
        }
      }
      sfxRef.current = null
      onEnd?.()
    })

    sfx.play().catch(() => {})
  }, [])

  const changeMusic = useCallback((src: string) => {
    const music = musicRef.current
    if (!music) return
    // Parar la música actual
    music.pause()

    // Crear la pista alternativa
    const alt = new Audio(src)
    alt.loop = true
    alt.volume = 0.35
    alt.muted = mutedRef.current
    altMusicRef.current = alt
    alt.play().catch(() => {})
  }, [])

  const restoreMusic = useCallback(() => {
    // Parar la pista alternativa
    const alt = altMusicRef.current
    if (alt) {
      alt.pause()
      alt.src = ""
      altMusicRef.current = null
    }

    // Reanudar la música original
    const music = musicRef.current
    if (music && musicStartedRef.current && !mutedRef.current) {
      music.play().catch(() => {})
    }
  }, [])

  return (
    <AudioCtx.Provider value={{ startMusic, stopMusic, toggleMute, muted, playSfx, changeMusic, restoreMusic }}>
      {children}
    </AudioCtx.Provider>
  )
}
