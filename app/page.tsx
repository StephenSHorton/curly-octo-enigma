"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const colors = [
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-orange-100",
  "bg-orange-200",
  "bg-orange-300",
  "bg-orange-400",
  "bg-orange-500",
  "bg-yellow-100",
  "bg-yellow-200",
  "bg-yellow-300",
  "bg-yellow-400",
  "bg-yellow-500",
  "bg-green-100",
  "bg-green-200",
  "bg-green-300",
  "bg-green-400",
  "bg-green-500",
  "bg-blue-100",
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-indigo-100",
  "bg-indigo-200",
  "bg-indigo-300",
  "bg-indigo-400",
  "bg-indigo-500",
]

export default function Page() {
  const [squares, setSquares] = useState<any[]>([])

  useEffect(() => {
    const squares = []
    for (let i = 0; i < 35; i++) {
      const color = colors[i % colors.length]
      const styles = clsx(
        color,
        "top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 fixed flex h-[300px] w-[300px] items-center justify-center rounded border border-slate-300 shadow",
      )
      squares.push(
        <motion.div
          animate={{ rotate: i * 300, scale: 1 / (i / 10) }}
          transition={{ ease: "linear", duration: 100 }}
          className={styles}
        />,
      )
    }
    setSquares(squares)
  }, [])

  return (
    <>
      <div className="flex items-center justify-center">
        {squares.map((square, index) => (
          <div key={index}>{square}</div>
        ))}
      </div>
    </>
  )
}
