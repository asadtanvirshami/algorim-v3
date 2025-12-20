/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type ContactItem = {
  country: string;
  phone: string;
};

const FOOTER_CONTACTS: ContactItem[] = [
  { country: "Andorra", phone: "+371 665 320" },
  { country: "United Arab Emirates", phone: "+971 50 697 5307" },
  { country: "Spain", phone: "+34 635 110 145" },
  { country: "Pakistan", phone: "+92 331 2051939" },
  { country: "United States", phone: "+1 707-657-5347" },
];

const toTel = (phone: string) => phone.replace(/[^\d+]/g, "");

const FOOTER_LINKS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Branding", href: "#services" },
      { label: "Engineering", href: "#services" },
      { label: "AI Automation", href: "#services" },
      { label: "Cyber Security", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#who-heading" },
      { label: "Process", href: "#process-kicker" },
      { label: "Contact", href: "mailto:business@algorimsoft.com" },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/algorim-io",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/algorim.io",
        external: true,
      },
    ],
  },
];

const Footer = ({ footerSectionRef, CONTAINER, UI, lenis }) => {
  const handleAnchorClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      external?: boolean
    ) => {
      if (external) return;
      if (!href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target as any, { offset: -40 });
      }
    },
    []
  );
  return (
    <section
      ref={footerSectionRef}
      className="relative min-h-[90svh] md:min-h-[100svh] overflow-hidden"
    >
      <div
        className={`relative ${CONTAINER} pt-20 pb-14 md:pt-24 md:pb-16 h-full flex flex-col justify-between`}
      >
        <div className="footer-inner space-y-10">
          <div className="footer-head space-y-3">
            <p
              className={`text-[11px] uppercase tracking-[0.28em] ${UI.textMuted}`}
            >
              Let’s build something dangerous (in a good way)
            </p>

            <h2
              className={`footer-title text-4xl md:text-5xl font-semibold leading-tight ${UI.textStrong}`}
            >
              Ready to ship a <span className={UI.accentText}>premium</span>{" "}
              product?
            </h2>

            <p
              className={`footer-sub text-sm md:text-base ${UI.textSub} max-w-2xl`}
            >
              Brand, engineering, AI, security and cloud — one team, one system,
              one delivery standard.
            </p>
          </div>

          <div className="footer-cta flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href="https://meet.brevo.com/algorim-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3 text-sm font-semibold
                    bg-white text-black hover:bg-white/90
                    shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                    hover:scale-[1.02] active:scale-[0.98]
                    transition
                  "
            >
              Book a call
            </a>

            <a
              href="mailto:business@algorimsoft.com"
              className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3 text-sm font-semibold
                    border border-white/12
                    bg-white/[0.05]
                    backdrop-blur-xl
                    hover:border-white/20
                    transition-colors
                    text-white/90
                  "
            >
              business@algorimsoft.com
            </a>
          </div>

          <div className="footer-contact space-y-4 pt-4">
            <p
              className={`text-xs uppercase tracking-[0.22em] ${UI.textMuted}`}
            >
              Contact
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FOOTER_CONTACTS.map((c: any) => (
                <li
                  key={c.country}
                  className="
                        group flex items-center justify-between gap-3
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        backdrop-blur-xl
                        px-4 py-3
                        transition-all
                        hover:border-white/20
                        hover:-translate-y-[1px]
                      "
                >
                  <span
                    className={`text-[11px] uppercase tracking-[0.22em] ${UI.textMuted}`}
                  >
                    {c.country}
                  </span>

                  <a
                    href={`tel:${toTel(c.phone)}`}
                    className="font-mono text-sm text-white/92 inline-flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="hidden sm:inline text-[10px] opacity-60">
                      ↗
                    </span>
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-grid grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
            {FOOTER_LINKS.map((col: any) => (
              <div key={col.title} className="footer-col space-y-3">
                <p
                  className={`text-xs uppercase tracking-[0.22em] ${UI.textMuted}`}
                >
                  {col.title}
                </p>

                <ul className="space-y-2 text-sm text-white/80">
                  {col.links.map((link: any) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) =>
                          handleAnchorClick(e, link.href, link.external)
                        }
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                      >
                        {link.label}
                        {link.external && (
                          <span className="text-[10px] opacity-60">↗</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className={`text-xs ${UI.textMuted}`}>
            © {new Date().getFullYear()} Algorim. All rights reserved.
          </p>

          <div className={`flex items-center gap-3 text-xs ${UI.textMuted}`}>
            <span className="footer-dot inline-block h-2 w-2 rounded-full bg-white/45 shadow-[0_0_16px_rgba(255,255,255,0.10)]" />
            <span>Build fast · Ship safe · Look premium</span>
          </div>
        </div>

        <div className="footer-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-white/8 blur-[190px] -z-10" />
      </div>
    </section>
  );
};

export default Footer;
