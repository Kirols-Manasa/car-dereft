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
      <main className="min-h-screen bg-gradient-to-br from-[#0D0221] via-[#2A043C] to-[#3E065F] text-white font-sans">
        
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            مرحباً بك في <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8D00FF] via-[#FF3CAC] to-[#00FFE0]">عالم السحر</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            منصة متقدمة بتصميم جذاب، ألوان سحرية، وتجربة مستخدم فريدة.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={session ? "/dashboard" : "/api/auth/signin"}
              className="rounded-2xl bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] px-8 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg"
            >
              {session ? "الذهاب للوحة التحكم" : "تسجيل الدخول"}
            </Link>

            <Link
              href="#features"
              className="rounded-2xl border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10 hover:scale-105"
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
              color: "from-[#8D00FF] to-[#FF3CAC]",
            },
            {
              title: "أمان متكامل",
              desc: "مصادقة قوية باستخدام أحدث معايير الأمان.",
              color: "from-[#00FFE0] to-[#0077FF]",
            },
            {
              title: "قابلية توسع",
              desc: "بنية نظيفة قابلة للنمو مع مشروعك.",
              color: "from-[#FFDD00] to-[#FF6B00]",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition"
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
          <div className="rounded-3xl bg-white/5 p-10 border border-white/10 backdrop-blur-xl">
            <p className="text-xl text-white/80">
              {hello?.greeting || "Loading..."}
            </p>

            {session?.user ? (
              <>
                <p className="mt-4 text-2xl font-semibold text-[#FF3CAC]">
                  👋 مرحبًا {session.user.name}
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    href="/api/auth/signout"
                    className="rounded-xl bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] px-6 py-2 font-semibold text-white hover:scale-105 transition shadow-lg"
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
          © {new Date().getFullYear()} زمنصة السحر — جميع الحقوق محفوظة
        </footer>
      </main>
    </HydrateClient>
  );
}
