import { useEffect, useRef } from 'react'

// Animated "neural network" of drifting nodes that link up and react to the cursor.
export default function NeuralBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, nodes = [], raf = 0, frame = 0, rgb = '34,211,238', visible = true

    const readColor = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().split(/\s+/).join(',')
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.floor((w * h) / 13000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const draw = () => {
      if (frame++ % 30 === 0) readColor()
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy)
        if (d > 0 && d < 120) {
          n.x += (dx / d) * 1.2
          n.y += (dy / d) * 1.2
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / 130) * 0.3})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 200) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - md / 200) * 0.5})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(${rgb},0.85)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }

    // Stop animating once the hero scrolls out of view
    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    readColor()
    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
