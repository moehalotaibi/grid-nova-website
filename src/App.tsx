import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Home from "@/pages/Home";

const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const News = lazy(() => import("@/pages/News"));
const Article = lazy(() => import("@/pages/Article"));
const Contact = lazy(() => import("@/pages/Contact"));
const Careers = lazy(() => import("@/pages/Careers"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const Apply = lazy(() => import("@/pages/Apply"));
const Faq = lazy(() => import("@/pages/Faq"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** 13 English routes + the /ar mirror (handoff › board 16). */
const pages: { path: string; element: React.ReactElement }[] = [
  { path: "", element: <Home /> },
  { path: "services", element: <Services /> },
  { path: "services/:slug", element: <ServiceDetail /> },
  { path: "projects", element: <Projects /> },
  { path: "projects/:slug", element: <ProjectDetail /> },
  { path: "about", element: <About /> },
  { path: "news", element: <News /> },
  { path: "news/:slug", element: <Article /> },
  { path: "contact", element: <Contact /> },
  { path: "careers", element: <Careers /> },
  { path: "careers/apply", element: <Apply /> },
  { path: "careers/:slug", element: <JobDetail /> },
  { path: "faq", element: <Faq /> },
  { path: "privacy", element: <Legal slug="privacy" /> },
  { path: "terms", element: <Legal slug="terms" /> },
  { path: "cookies", element: <Legal slug="cookies" /> },
  { path: "*", element: <NotFound /> },
];

function Fallback() {
  return <div className="min-h-[60vh] bg-navy-deep" aria-busy="true" />;
}

export default function App() {
  return (
    <LocaleProvider>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<SiteLayout />}>
            {pages.map((p) => (
              <Route key={`en-${p.path}`} path={`/${p.path}`} element={p.element} />
            ))}
            <Route path="/ar">
              {pages.map((p) =>
                p.path === "" ? (
                  <Route key="ar-index" index element={p.element} />
                ) : (
                  <Route key={`ar-${p.path}`} path={p.path} element={p.element} />
                ),
              )}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </LocaleProvider>
  );
}
