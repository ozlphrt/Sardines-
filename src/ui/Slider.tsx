import React from 'react'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  precision?: number
  unit?: string
  onChange: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.1,
  precision = 2,
  unit = '',
  onChange,
}) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  return (
    <div className="group py-1 select-none">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors">
          {label}
        </label>
        <span className="font-mono text-xs font-semibold text-[#38bdf8] bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-400/25 shadow-sm">
          {value.toFixed(precision)}{unit}
        </span>
      </div>
      <div className="relative flex items-center h-4">
        {/* Track background */}
        <div className="absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2fa1d6] to-[#38bdf8] rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="relative w-full h-4 opacity-0 cursor-ew-resize z-10"
        />
        {/* Sleek visible thumb */}
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-md pointer-events-none transform -translate-x-1/2 transition-transform group-hover:scale-125 border border-sky-400/40"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Slider
