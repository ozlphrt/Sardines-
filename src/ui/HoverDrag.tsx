import React, { useState, useRef, useCallback } from 'react'

interface HoverDragProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  description?: string
  onReset?: () => void
}

const HoverDrag: React.FC<HoverDragProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  description,
  onReset
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const dragStartY = useRef(0)
  const dragStartValue = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartY.current = e.clientY
    dragStartValue.current = value
  }, [value])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return

    const deltaY = dragStartY.current - e.clientY
    const deltaValue = deltaY * step

    // Apply modifiers
    let multiplier = 1
    if (e.shiftKey) multiplier = 10
    if (e.altKey) multiplier = 0.1

    const newValue = Math.max(min, Math.min(max, dragStartValue.current + (deltaValue * multiplier)))
    onChange(newValue)
  }, [isDragging, step, min, max, onChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDoubleClick = useCallback(() => {
    if (onReset) {
      onReset()
    }
  }, [onReset])

  // Global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const formatValue = (val: number | undefined) => {
    if (val === undefined || val === null) return '0'
    if (step < 1) return val.toFixed(1)
    return val.toFixed(0)
  }

  return (
    <div className="relative">
             <div
         className="flex items-center justify-between py-0.5 px-1 rounded bg-bg1/50 hover:bg-bg1 transition-colors cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDoubleClick={handleDoubleClick}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        tabIndex={0}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value || 0}
        aria-valuetext={formatValue(value)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text">{label}</span>
            <span className="text-sm font-mono text-accent">{formatValue(value)}</span>
          </div>
        </div>

        {/* Drag indicator */}
        {isHovering && (
          <div className="ml-2 text-xs text-muted">
            {isDragging ? '↕' : '↕'}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && description && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-bg2 text-xs text-muted rounded-lg shadow-lg max-w-xs z-10">
          {description}
          <div className="text-xs text-muted mt-1">
            Drag to adjust • Shift+Drag for fine control • Double-click to reset
          </div>
        </div>
      )}
    </div>
  )
}

export default HoverDrag
