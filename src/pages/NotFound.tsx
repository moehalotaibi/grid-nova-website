import { ArrowRight } from "lucide-react";
import { useLocale, useStrings } from "@/i18n/LocaleProvider";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";

const en = {
  title: "Page not found",
  intro: "The page you're looking for doesn't exist or has moved. Head back to the homepage, or get in touch and we'll point you in the right direction.",
};
const ar = {
  title: "الصفحة غير موجودة",
  intro: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. عُد إلى الصفحة الرئيسية، أو تواصل معنا وسنرشدك إلى الاتجاه الصحيح.",
};

/** 404 — a short navy block in the page-hero idiom: 404 eyebrow, Display/Hero h1, intro, home + contact buttons. */
export default function NotFoundPage() {
  const { s } = useLocale();
  const t = useStrings(en, ar);
  usePageMeta(t.title);
  return (
    <section className="dark-surface bg-navy-deep pt-[var(--nav-height)] text-white">
      <div className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-5 py-20 lg:py-28">
        <Eyebrow color="cyan">
          <span className="num">404</span>
        </Eyebrow>
        <h1 className="display-hero max-w-[900px] text-white">{t.title}</h1>
        <p className="body-l max-w-[600px] text-white/75">{t.intro}</p>
        <div className="mt-3 flex flex-col gap-3 xs:flex-row">
          <Button to="/" icon={<ArrowRight />}>
            {s.nav.home}
          </Button>
          <Button to="/contact" variant="outlineLight">
            {s.nav.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
