import React from 'react'

interface SliderProps {
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min,
    max,
    step = 0.1,
    onChange,
}) => {
    const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

    return (
        <div className="dat-gui-row">
            <div className="dat-gui-label" title={label}>
                {label}
            </div>
            <div className="dat-gui-controller">
                <div
                    className="dat-gui-slider-fg"
                    style={{ width: `${percentage}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="dat-gui-range"
                />
                <div className="dat-gui-input-text">
                    {value.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default Slider
