import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { LatestPost } from "@/app/_components/post";

export default async function Home() {
  const session = await auth();
  const hello = await api.post.hello({ text: "Welcome" });

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Build <span className="text-cyan-400">Modern</span> Web Apps
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            منصة حديثة مبنية بـ Next.js + tRPC + Auth  
            أداء عالي، أمان، وتجربة استخدام راقية.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={session ? "/dashboard" : "/api/auth/signin"}
              className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              {session ? "الذهاب للوحة التحكم" : "تسجيل الدخول"}
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              استكشاف المميزات
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 py-20 grid gap-8 md:grid-cols-3"
        >
          {[
            {
              title: "أداء فائق",
              desc: "SSR + tRPC لضمان أسرع استجابة ممكنة.",
              color: "from-cyan-400 to-blue-500",
            },
            {
              title: "أمان متكامل",
              desc: "مصادقة مبنية على NextAuth ومعايير حديثة.",
              color: "from-purple-400 to-pink-500",
            },
            {
              title: "قابلية توسّع",
              desc: "بنية نظيفة قابلة للنمو مع مشروعك.",
              color: "from-emerald-400 to-teal-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 p-6 backdrop-blur border border-white/10 hover:border-white/20 transition"
            >
              <div
                className={`h-1 w-full rounded-full bg-gradient-to-r ${item.color}`}
              />
              <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-white/70">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* USER STATUS */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="rounded-3xl bg-white/5 p-10 border border-white/10 backdrop-blur">
            <p className="text-xl text-white/80">
              {hello?.greeting}
            </p>

            {session?.user ? (
              <>
                <p className="mt-4 text-2xl font-semibold">
                  👋 مرحبًا {session.user.name}
                </p>

                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    href="/api/auth/signout"
                    className="rounded-xl bg-red-500/80 px-6 py-2 font-semibold hover:bg-red-500"
                  >
                    تسجيل الخروج
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-4 text-white/60">
                لم تقم بتسجيل الدخول بعد
              </p>
            )}
          </div>
        </section>

        {/* LATEST POST */}
        {session?.user && (
          <section className="mx-auto max-w-4xl px-6 pb-24">
            <LatestPost />
          </section>
        )}

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-8 text-center text-white/40">
          © {new Date().getFullYear()} Modern App — All rights reserved
        </footer>
      </main>
    </HydrateClient>
  );
}
