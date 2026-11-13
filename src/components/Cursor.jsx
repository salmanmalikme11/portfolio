import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Soft glowing ring that trails the pointer and grows over links/buttons. Desktop only.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHovering(!!e.target.closest?.('a, button, input, textarea'))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100]">
      <motion.div
        animate={{ width: hovering ? 44 : 22, height: hovering ? 44 : 22, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ duration: 0.2 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-accent/10"
      />
    </motion.div>
  )
}
