import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { submitTestimonial } from "@/data/site-content";

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    try {
      await submitTestimonial({
        name: String(formData.get("name")),
        role: String(formData.get("role") || ""),
        quote: String(formData.get("quote")),
        rating,
      });
      setSent(true);
    } catch (err) {
      console.error("Review submission error:", err);
      setError("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative bg-clay/5 px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Client Reviews
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Share Your <span className="text-clay">Experience</span>
          </h2>
          <p className="mx-auto max-w-lg opacity-60">
            Worked with us before? Leave a review and help others find trusted real estate in the
            North.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-3xl">
          <div className="glass-strong rounded-[2.5rem] p-8 shadow-xl md:p-12">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="mb-6 size-16 text-clay" />
                <h3 className="mb-2 font-display text-3xl font-bold">Thank You!</h3>
                <p className="max-w-sm opacity-60">
                  Your review has been received and will appear on the site once approved by our
                  team.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Full name"
                      className="w-full rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="mb-2 block text-sm font-semibold">
                      How did you work with us?
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="w-full rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Plot buyer">Plot buyer</option>
                      <option value="Homeowner">Homeowner</option>
                      <option value="Tenant">Tenant</option>
                      <option value="Investor">Investor</option>
                      <option value="Client">Client</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-semibold">Your rating</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={
                            n <= (hover || rating)
                              ? "size-7 fill-clay text-clay"
                              : "size-7 text-clay/25"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="quote" className="mb-2 block text-sm font-semibold">
                    Your review
                  </label>
                  <textarea
                    id="quote"
                    name="quote"
                    rows={4}
                    required
                    placeholder="Tell us about your experience with Malanga 1..."
                    className="w-full resize-none rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {error && (
                  <p className="rounded-2xl bg-destructive/10 px-5 py-3 text-sm font-semibold text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-2xl bg-clay px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60 md:w-auto"
                >
                  {sending ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
