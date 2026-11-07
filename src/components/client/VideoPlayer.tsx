'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type State = 'idle' | 'playing' | 'paused' | 'ended'

const formatTime = (s: number) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

/** Reproductor con controles propios (play/pausa, barra, tiempo, pantalla completa). */
export function VideoPlayer({ src, poster, caption }: { src: string; poster?: string | null; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stateRef = useRef<State>('idle')
  const isTouch = useRef(false)

  const [state, setStateRaw] = useState<State>('idle')
  const [controlsVisible, setControlsVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const setState = (s: State) => {
    stateRef.current = s
    setStateRaw(s)
  }

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (stateRef.current === 'playing') setControlsVisible(false)
    }, 3000)
  }, [])

  useEffect(() => {
    const v = videoRef.current!
    if (v.readyState >= 1) setDuration(v.duration)
    const markTouch = () => (isTouch.current = true)
    window.addEventListener('touchstart', markTouch, { once: true, passive: true })

    const onFs = () => {
      const d = document as Document & { webkitFullscreenElement?: Element }
      setFullscreen(Boolean(document.fullscreenElement || d.webkitFullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('webkitfullscreenchange', onFs)
    return () => {
      window.removeEventListener('touchstart', markTouch)
      document.removeEventListener('fullscreenchange', onFs)
      document.removeEventListener('webkitfullscreenchange', onFs)
      clearTimeout(hideTimer.current)
    }
  }, [])

  const onPlay = () => {
    setState('playing')
    setControlsVisible(true)
    scheduleHide()
  }
  const onPause = () => {
    if (stateRef.current === 'ended') return
    setState('paused')
    setControlsVisible(true)
    clearTimeout(hideTimer.current)
  }
  const onEnded = () => {
    setState('ended')
    setControlsVisible(false)
    clearTimeout(hideTimer.current)
    videoRef.current!.currentTime = 0
  }

  const togglePlay = () => {
    const v = videoRef.current!
    if (v.paused) v.play()
    else v.pause()
  }

  const seek = (e: React.MouseEvent) => {
    const v = videoRef.current!
    const rect = barRef.current!.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = pct * v.duration
  }

  const toggleFullscreen = () => {
    const el = wrapperRef.current as HTMLDivElement & { webkitRequestFullscreen?: () => void }
    const d = document as Document & { webkitExitFullscreen?: () => void }
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen()
      else el.webkitRequestFullscreen?.()
    } else if (document.exitFullscreen) document.exitFullscreen()
    else d.webkitExitFullscreen?.()
  }

  const isActive = state === 'playing' || state === 'paused'

  const onWrapperClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.video-controls') || target.closest('.video-overlay')) return
    if (!isActive) return
    if (controlsVisible) {
      setControlsVisible(false)
      clearTimeout(hideTimer.current)
    } else {
      setControlsVisible(true)
      if (stateRef.current === 'playing') scheduleHide()
      else clearTimeout(hideTimer.current)
    }
  }

  const onMouseMove = () => {
    if (isTouch.current || !isActive) return
    setControlsVisible(true)
    if (stateRef.current === 'playing') scheduleHide()
    else clearTimeout(hideTimer.current)
  }

  const pct = duration ? (current / duration) * 100 : 0

  return (
    <div className="video-wrapper" id="videoWrapper" ref={wrapperRef} onClick={onWrapperClick} onMouseMove={onMouseMove}>
      <video
        ref={videoRef}
        id="myVideo"
        preload="metadata"
        playsInline
        poster={poster ?? undefined}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Capa invisible para capturar taps en móvil */}
      <div id="tapCatcher" />

      {/* Overlay inicial */}
      <div className={`video-overlay${isActive ? ' hidden' : ''}`} id="videoOverlay" onClick={() => videoRef.current?.play()}>
        <div className="play-ring" />
        <div className="play-btn-icon">
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
            <path d="M0 0L28 16L0 32V0Z" fill="white" />
          </svg>
        </div>
        <p className="video-subtitle">{caption}</p>
      </div>

      {/* Barra de controles personalizada */}
      <div className={`video-controls${controlsVisible ? ' visible' : ''}`} id="videoControls">
        <button className="ctrl-btn" type="button" onClick={togglePlay} title="Play / Pausa" aria-label="Play / Pausa">
          <div className="ctrl-ring" />
          <span className="ctrl-icon">
            {state === 'playing' ? (
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <rect x="0" y="0" width="5" height="22" rx="2" fill="white" />
                <rect x="13" y="0" width="5" height="22" rx="2" fill="white" />
              </svg>
            ) : (
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M0 0L20 11L0 22V0Z" fill="white" />
              </svg>
            )}
          </span>
        </button>

        <div className="ctrl-progress-wrap">
          <div className="ctrl-progress-bar" ref={barRef} onClick={seek}>
            <div className="ctrl-progress-fill" style={{ width: `${pct}%` }} />
            <div className="ctrl-progress-thumb" style={{ left: `${pct}%` }} />
          </div>
        </div>

        <div className="ctrl-time">
          <span>{formatTime(current)}</span>
          <span className="ctrl-time-sep">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        <button
          className="ctrl-btn ctrl-btn-fs"
          type="button"
          onClick={toggleFullscreen}
          title="Pantalla completa"
          aria-label="Pantalla completa"
        >
          <span className="ctrl-icon">
            {fullscreen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 1V7H1M13 7H19M13 19V13H19M1 13H7V19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2 7.5V2.5H7.5M12.5 2.5H17.5V7.5M17.5 12.5V17.5H12.5M7.5 17.5H2.5V12.5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
