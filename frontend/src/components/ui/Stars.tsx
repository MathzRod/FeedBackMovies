"use client"

type StarsProps = {
  value: number
  onChange: (value: number) => void
}

// Esse componente é usado no dashboard para escolher a nota.
// Se clicar do lado esquerdo da estrela, marca meia estrela.
export default function Stars({ value, onChange }: StarsProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>, star: number) {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const isLeft = clickX < rect.width / 2

    const newValue = isLeft ? star - 0.5 : star
    onChange(newValue)
  }

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = value >= star
        const isHalf = value >= star - 0.5 && value < star

        return (
          <div
            key={star}
            onClick={(e) => handleClick(e, star)}
            className="relative cursor-pointer text-4xl transition-transform hover:scale-110"
          >
            {/* estrela base */}
            <span className="text-white/30">★</span>

            {/* estrela cheia */}
            {isFull && (
              <span className="absolute inset-0 text-yellow-300">★</span>
            )}

            {/* meia estrela */}
            {isHalf && (
              <span
                className="absolute inset-0 text-yellow-300 overflow-hidden"
                style={{ width: "50%" }}
              >
                ★
              </span>
            )}
          </div>
        )
      })}

      <span className="ml-2 text-2xl text-white/70">
        {value.toFixed(1)}/5.0
      </span>
    </div>
  )
}
