import React from 'react'

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  description?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, description }) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between py-2 px-1 cursor-pointer group select-none hover:bg-white/5 rounded-lg transition-colors"
    >
      <div>
        <div className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors">
          {label}
        </div>
        {description && <div className="text-[11px] text-slate-400 mt-0.5">{description}</div>}
      </div>
      <div
        className={`relative w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
          checked ? 'bg-[#2fa1d6]' : 'bg-white/20'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  )
}

export default ToggleSwitch
