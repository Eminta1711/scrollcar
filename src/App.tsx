import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const headline = "WELCOME ITZFIZZ"

const stats = [
  { value: "100%", label: "Electric ambition" },
  { value: "2.8s", label: "Zero to one hundred" },
  { value: "520km", label: "Uncompromised range" },
]

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        d="M12 4v15m0 0 6-6m-6 6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function App() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const context = gsap.context(() => {
      const letters = headlineRef.current?.querySelectorAll(".letter")
      const statItems = statsRef.current?.querySelectorAll(".stat")
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } })

      intro
        .fromTo(letters ?? [], { yPercent: 110, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.035,
        })
        .fromTo(
          visualRef.current,
          { clipPath: "inset(0 50% 0 50% round 999px)", scale: 0.94 },
          {
            clipPath: "inset(0 0% 0 0% round 999px)",
            scale: 1,
            duration: 1.35,
          },
          "-=0.72",
        )
        .fromTo(
          statItems ?? [],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.14 },
          "-=0.72",
        )
        .fromTo(
          ".intro-detail",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
          "-=0.55",
        )

      const motion = gsap.matchMedia()
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.15,
          },
        })

        scroll
          .to(
            visualRef.current,
            { xPercent: 19, yPercent: -7, scale: 1.12, rotate: -1.5 },
            0,
          )
          .to(imageRef.current, { xPercent: -10, scale: 1.17 }, 0)
          .to(ringRef.current, { rotate: 125, scale: 1.12 }, 0)
          .to(
            headlineRef.current,
            { xPercent: -4, yPercent: -16, opacity: 0.16 },
            0,
          )
          .to(statsRef.current, { yPercent: -28, opacity: 0.22 }, 0)
          .to(".scroll-copy", { yPercent: -90, opacity: 1 }, 0.28)
          .to(progressRef.current, { scaleX: 1, ease: "none" }, 0)
      })

      return () => motion.revert()
    }, scene)

    return () => context.revert()
  }, [])

  return (
    <main className="overflow-clip bg-ink text-cream">
      <section ref={sceneRef} className="relative h-[190vh] bg-cream text-ink">
        <div className="sticky top-0 h-svh min-h-[40rem] overflow-hidden">
          <div className="grain" aria-hidden="true" />

          <header className="intro-detail absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
            <div className="font-display text-lg font-semibold tracking-[-0.04em]">
              ITZFIZZ®
            </div>
            <div className="hidden items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:flex">
              <span className="size-1.5 rounded-full bg-coral" />
              Concept 01 / 2025
            </div>
            <div className="rounded-full border border-ink/20 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
              Crafted motion
            </div>
          </header>

          <div ref={ringRef} aria-hidden="true" className="hero-ring" />

          <div className="absolute inset-x-0 top-[14%] z-10 px-5 md:top-[12%] md:px-10">
            <h1
              ref={headlineRef}
              aria-label={headline}
              className="headline mx-auto flex max-w-[96rem] flex-wrap justify-center overflow-hidden"
            >
              {headline.split("").map((character, index) =>
                character === " " ? (
                  <span key={index} aria-hidden="true" className="w-[0.55em]" />
                ) : (
                  <span
                    key={index}
                    aria-hidden="true"
                    className="letter inline-block"
                  >
                    {character}
                  </span>
                ),
              )}
            </h1>
          </div>

          <div
            ref={visualRef}
            className="absolute left-1/2 top-[37%] z-20 h-[31vh] min-h-56 w-[84vw] max-w-[78rem] -translate-x-1/2 overflow-hidden rounded-full bg-ink shadow-[0_2.5rem_6rem_rgba(25,20,17,0.28)] md:top-[34%] md:h-[39vh]"
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1618480483701-c31ac5590db4?auto=format&fit=crop&w=1800&q=88"
              alt="Black performance coupe parked in a modern urban setting"
              className="h-full w-full scale-[1.06] object-cover object-[50%_57%] contrast-[1.08] saturate-[0.72]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-ink/20" />
            <div className="absolute bottom-5 left-7 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/75 md:bottom-7 md:left-10">
              Designed to move differently
            </div>
          </div>

          <div
            ref={statsRef}
            className="absolute inset-x-5 bottom-7 z-30 grid grid-cols-3 gap-3 border-t border-ink/20 pt-4 md:inset-x-10 md:bottom-9 md:gap-12 md:pt-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="stat flex flex-col gap-1 md:flex-row md:items-end md:gap-3"
              >
                <strong className="font-display text-[clamp(1.4rem,3vw,3.5rem)] font-medium leading-none tracking-[-0.06em]">
                  {stat.value}
                </strong>
                <span className="max-w-24 text-[0.56rem] font-semibold uppercase leading-tight tracking-[0.12em] text-ink/55 md:pb-1 md:text-[0.65rem]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="intro-detail absolute bottom-[18%] left-5 z-30 hidden items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.18em] md:flex md:left-10">
            <span className="flex size-8 items-center justify-center rounded-full border border-ink/30">
              <ArrowDown />
            </span>
            Scroll to drive
          </div>

          <p className="scroll-copy pointer-events-none absolute bottom-[-5%] left-[6%] z-10 max-w-xl font-display text-[clamp(2.8rem,6vw,6.4rem)] leading-[0.85] tracking-[-0.06em] opacity-0">
            Motion that leaves a mark.
          </p>

          <div className="absolute bottom-0 left-0 z-40 h-1 w-full bg-ink/10">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-coral"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 grid min-h-screen place-items-center px-6 py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <p className="font-display text-[clamp(3.4rem,8vw,8rem)] leading-[0.86] tracking-[-0.065em]">
            Not built to stand still.
          </p>
          <div className="border-t border-cream/25 pt-5 text-sm leading-6 text-cream/60">
            A kinetic concept for a new generation of electric performance.
            Every curve, transition, and interaction is tuned for momentum.
          </div>
        </div>
      </section>
    </main>
  )
}
