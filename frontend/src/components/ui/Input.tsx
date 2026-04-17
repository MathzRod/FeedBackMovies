import { forwardRef, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Inputs = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col">
        {label && (
          <label
            htmlFor={id}
            className="mb-3 text-sm font-medium text-zinc-900 hidden"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              {icon}
            </div>
          )}

          <input
            id={id}
            ref={ref}
            className={`
              w-full h-12 rounded-lg 
              bg-zinc-900/40 backdrop-blur-md
              border border-zinc-700/50
              text-zinc-100 text-sm
              transition-all duration-200
              placeholder:text-zinc-300
              placeholder:font-bold
              
              focus:outline-none
              focus:border-red-500/70
              focus:ring-1 focus:ring-red-500/30
              focus:bg-zinc-900/60
              
              disabled:opacity-50 disabled:cursor-not-allowed
              
              ${icon ? "pl-11 pr-4" : "px-4"}
              ${error 
                ? "border-red-500/70 bg-red-950/20" 
                : "hover:border-zinc-600/70"
              }
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-2 text-xs font-medium text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Inputs.displayName = "Inputs"