import React, { useEffect, useState } from 'react'
import { useSimulationStore } from '../stores/simulationStore'

const DURATION_MS = 2500

const CameraPresetToast: React.FC = () => {
  const cameraToast = useSimulationStore((s) => s.cameraToast)
  const sidebarVisible = useSimulationStore((s) => s.ui.sidebarVisible)
  const [visible, setVisible] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const [activeToast, setActiveToast] = useState(cameraToast)

  useEffect(() => {
    if (!cameraToast) return

    setActiveToast(cameraToast)
    setVisible(true)
    setAnimatingOut(false)

    // Start fade out slightly before total duration
    const fadeTimer = setTimeout(() => {
      setAnimatingOut(true)
    }, DURATION_MS - 300)

    const hideTimer = setTimeout(() => {
      setVisible(false)
      setAnimatingOut(false)
    }, DURATION_MS)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [cameraToast?.timestamp])

  if (!visible || !activeToast) return null

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP-CENTER CINEMATIC BANNER                                */}
      {/* ------------------------------------------------------------- */}
      <div
        id="camera-preset-toast-banner"
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none transition-all duration-300 ${
          animatingOut
            ? 'opacity-0 -translate-y-2 scale-95'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#06121e]/90 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_30px_rgba(0,255,255,0.2)] select-none">
          {/* Icon Badge */}
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 text-2xl shadow-inner shadow-cyan-500/20">
            <span>{activeToast.icon}</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00ffff]" />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                Camera Preset
              </span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
              <span className="text-[10px] font-mono text-white/50 bg-white/10 px-1.5 py-0.2 rounded">
                'C'
              </span>
            </div>

            <div className="text-base font-extrabold text-white tracking-wide leading-tight mt-0.5">
              {activeToast.name}
            </div>

            <div className="text-[11px] font-medium text-slate-300 mt-0.5 max-w-[280px] truncate">
              {activeToast.desc}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. LOCAL FEEDBACK BADGE BESIDE FLOATING CAMERA BUTTON        */}
      {/* ------------------------------------------------------------- */}
      <div
        id="camera-preset-toast-pill"
        className={`fixed bottom-[88px] md:bottom-20 z-[99999] pointer-events-none transition-all duration-300 ${
          sidebarVisible ? 'right-[296px] md:right-[316px]' : 'right-20 md:right-20'
        } ${
          animatingOut
            ? 'opacity-0 translate-x-2'
            : 'opacity-100 translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#081524]/95 backdrop-blur-xl border border-cyan-400/40 text-xs font-semibold text-white shadow-2xl whitespace-nowrap">
          <span className="text-sm">{activeToast.icon}</span>
          <span className="text-cyan-300 font-bold">{activeToast.name}</span>
        </div>
      </div>
    </>
  )
}

export default CameraPresetToast
