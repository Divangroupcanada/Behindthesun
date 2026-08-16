import Link from "next/link";
import { Sparkles, Circle, BookOpen, Hash, Check, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-9">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6 rounded-full border-[1.5px] border-ink">
                <div className="absolute right-[5px] top-[6px] h-[11px] w-[11px] rounded-full bg-gold" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Behind the Sun</span>
            </Link>
            <div className="hidden gap-6 text-sm text-ink-muted md:flex">
              <Link href="/astrology" className="hover:text-ink">Astrology</Link>
              <Link href="/tarot" className="hover:text-ink">Tarot</Link>
              <Link href="/hafez" className="hover:text-ink">Hafez</Link>
              <Link href="/numerology" className="hover:text-ink">Numerology</Link>
              <Link href="/pricing" className="hover:text-ink">Pricing</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="hidden text-sm md:block">Sign in</Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-paper-2 px-3.5 py-1.5 text-xs text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span>New: Persian Hafez readings now live</span>
        </div>

        <h1 className="mb-6 font-serif text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Astrology, tarot, and{" "}
          <span className="italic text-gold">Persian poetry</span>—<br />
          done right.
        </h1>

        <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Real birth charts. Real Hafez verses. Real tarot decks. All in one place, with
          sources cited and math you can verify.
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/astrology/birth-chart"
            className="rounded-lg bg-ink px-7 py-3.5 text-sm font-medium text-white hover:bg-ink/90"
          >
            Get your free birth chart →
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-medium hover:border-ink-muted"
          >
            See how it works
          </Link>
        </div>

        <p className="text-sm text-ink-muted">
          Free forever plan · No credit card required · Cancel anytime
        </p>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-border bg-white py-8">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-ink-muted">
            Trusted by 50,000+ readers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-ink-muted">
            <span className="text-sm font-medium">★★★★★ 4.9</span>
            <span className="font-serif text-sm italic">"Refreshingly honest" — Toronto Star</span>
            <span className="font-serif text-sm italic">"Finally, sources cited" — Mindful</span>
            <span className="text-sm">App Store featured</span>
          </div>
        </div>
      </section>

      {/* Four doors */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              Four traditions
            </p>
            <h2 className="mb-3 text-4xl font-semibold tracking-tight">
              Everything you need, nothing made up.
            </h2>
            <p className="text-base text-ink-muted">
              Each reading shows you exactly which tradition it draws from and what method it uses.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DoorCard
              icon={<Circle className="h-5 w-5 text-gold" />}
              title="Birth chart"
              body="Your complete natal chart with all planets, houses, and aspects. Placidus house system."
              meta="3 min · birth date, time, place"
              href="/astrology/birth-chart"
            />
            <DoorCard
              icon={<BookOpen className="h-5 w-5 text-gold" />}
              title="Hafez reading"
              body="Draw a ghazal from the Divan of Hafez. Persian original with annotated English translation."
              meta="90 sec · just a question"
              href="/hafez"
            />
            <DoorCard
              icon={<Sparkles className="h-5 w-5 text-gold" />}
              title="Daily tarot"
              body="One card from the Rider-Waite-Smith deck. With history, symbolism, and reflection prompts."
              meta="2 min · no info needed"
              href="/tarot/daily"
            />
            <DoorCard
              icon={<Hash className="h-5 w-5 text-gold" />}
              title="Life path number"
              body="Your number from Pythagorean reduction. With the classical interpretation and significance."
              meta="60 sec · birth date only"
              href="/numerology/life-path"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              How it works
            </p>
            <h2 className="text-4xl font-semibold tracking-tight">
              From signup to your first reading in 60 seconds.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Step
              n={1}
              title="Tell us your birth info"
              body="Date, time, and city. Used only to calculate your chart. Never shared or sold."
            />
            <Step
              n={2}
              title="We calculate the math"
              body="Real astronomical positions using Swiss Ephemeris — the library professional astrologers use."
            />
            <Step
              n={3}
              title="Read with confidence"
              body="Every reading shows its source. You can verify everything against any professional book."
            />
          </div>
        </div>
      </section>

      {/* Why Behind the Sun */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
                Why Behind the Sun
              </p>
              <h2 className="mb-4 text-4xl font-semibold leading-tight tracking-tight">
                Most astrology apps make things up.<br />We don't.
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                Most apps default to outdated house systems, generate vague snippets, and grab your
                phone number on signup. We do none of that.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-paper p-6">
              <TrustPoint
                title="Industry-standard Placidus charts"
                body="Not Porphyry, not Whole Sign. The system 90% of professional astrologers use."
              />
              <TrustPoint
                title="Sources on every reading"
                body="From Liz Greene to Rumi. You can look every claim up."
              />
              <TrustPoint
                title="No phone number required"
                body="Email only. No contact list access. No data sold, ever."
              />
              <TrustPoint
                title="Reflection, not prophecy"
                body="We tell you what the tradition says. We don't predict your future."
                last
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              Reviews
            </p>
            <h2 className="text-4xl font-semibold tracking-tight">
              What people are saying.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Review
              stars={5}
              body="The Hafez readings feel different when you understand the verse is from 700 years ago."
              name="Yasmin K."
              meta="Toronto · 3 weeks ago"
              initial="Y"
            />
            <Review
              stars={5}
              body="Finally — they show the math. My chart matches Astro.com exactly because it IS the same data."
              name="David M."
              meta="London · 1 month ago"
              initial="D"
            />
            <Review
              stars={5}
              body="Doesn't try to scare me into paying. It's just good. Refreshing in this market."
              name="Aria S."
              meta="Los Angeles · 2 weeks ago"
              initial="A"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-5xl font-semibold tracking-tight">
            Start with your free birth chart.
          </h2>
          <p className="mb-8 text-base text-white/70">
            No card. No phone. Just real astrology, the way it should be.
          </p>
          <Link
            href="/astrology/birth-chart"
            className="inline-block rounded-lg bg-white px-8 py-4 text-sm font-semibold text-ink hover:bg-white/90"
          >
            Get your free chart →
          </Link>
          <p className="mt-4 text-sm text-white/50">
            Free forever · 50,000+ users · ★★★★★ 4.9
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] py-8 text-sm text-white/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border border-white/50" />
            <span>Behind the Sun · Built in Toronto</span>
          </div>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/about">About</Link>
            <Link href="/help">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DoorCard({
  icon,
  title,
  body,
  meta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  meta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border bg-paper p-6 transition-colors hover:border-ink-muted"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper-2">
          {icon}
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          FREE
        </span>
      </div>
      <h3 className="mb-1.5 text-lg font-semibold">{title}</h3>
      <p className="mb-3.5 text-sm leading-relaxed text-ink-muted">{body}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-muted">{meta}</span>
        <span className="text-sm font-medium text-ink group-hover:translate-x-0.5 group-hover:transition-transform">
          Start →
        </span>
      </div>
    </Link>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div>
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
        {n}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

function TrustPoint({ title, body, last = false }: { title: string; body: string; last?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${last ? "" : "mb-4"}`}>
      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-ink-muted">{body}</div>
      </div>
    </div>
  );
}

function Review({
  stars,
  body,
  name,
  meta,
  initial,
}: {
  stars: number;
  body: string;
  name: string;
  meta: string;
  initial: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <div className="mb-3 flex gap-0.5 text-gold">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed">{body}</p>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-paper-2 text-sm font-semibold text-gold">
          {initial}
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-ink-muted">{meta}</div>
        </div>
      </div>
    </div>
  );
}
