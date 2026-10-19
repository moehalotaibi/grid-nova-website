import { useId, useState, type FormEvent } from "react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { newsEn, newsAr } from "@/i18n/pages/news";

/**
 * Section / Newsletter (Figma 38:951): navy band, padding 72 / 120 · H3 + Body/M white 70 % on the start side ·
 * 320 email input (white 8 % fill, white 16 % border) + primary "Subscribe" on the end side. Stacks below 1024.
 */
export function Newsletter() {
  const { s } = useLocale();
  const t = useStrings(newsEn, newsAr);
  const id = useId();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="dark-surface bg-navy text-white">
      <div className="container-site flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-[72px]">
        <div className="flex max-w-[640px] flex-col gap-2">
          <h2 className="heading-h3 text-white">{t.newsletter.title}</h2>
          <p className="body-m text-white/70">{t.newsletter.intro}</p>
        </div>
        {subscribed ? (
          <p role="status" className="body-m text-brand-cyan">
            {s.footer.subscribed}
          </p>
        ) : (
          <form onSubmit={onSubmit} data-analytics="form_submit:newsletter" className="flex w-full flex-col gap-2 xs:flex-row lg:w-auto lg:shrink-0">
            <label htmlFor={id} className="sr-only">
              {s.footer.emailPlaceholder}
            </label>
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.footer.emailPlaceholder}
              className="body-m h-12 w-full min-w-0 rounded-10 border border-white/16 bg-white/8 px-4 text-white placeholder:text-white/55 focus:border-brand-cyan focus:outline-none xs:w-[320px]"
            />
            <Button type="submit" className="shrink-0">
              {s.footer.subscribe}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
