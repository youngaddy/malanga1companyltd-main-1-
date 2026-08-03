import { Link } from "@tanstack/react-router";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, TIKTOK_URL, FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/contact";
import logoAsset from "@/assets/logo_new.png";

export function Footer() {
  return (
    <footer className="rounded-t-[3rem] bg-earth px-6 py-20 text-earth-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center bg-white p-2 rounded-xl w-fit">
              <img
                src={logoAsset}
                alt="Malanga 1 Company Limited logo"
                width={1536}
                height={1024}
                className="h-12 w-auto max-w-[190px] object-contain rounded-lg sm:h-14 sm:max-w-[230px] md:h-16 md:max-w-[270px] lg:h-18 lg:max-w-[310px]"
              />
            </div>
            <p className="max-w-md text-lg leading-relaxed opacity-60">
              Based in Tamale, Northern Region, Malanga 1 Company Limited is committed to
              transparent, professional, and modern real estate solutions.
            </p>
          </div>
          <div>
            <h5 className="mb-6 font-bold text-clay">Navigation</h5>
            <ul className="space-y-4 text-sm opacity-70">
              <li>
                <Link to="/properties" className="transition-opacity hover:opacity-100">
                  Properties Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-opacity hover:opacity-100">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="transition-opacity hover:opacity-100">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-opacity hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 font-bold text-clay">Headquarters</h5>
            <p className="mb-4 text-sm opacity-70">
              {ADDRESS.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < ADDRESS.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="mb-2 font-bold">{PHONE_DISPLAY}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm opacity-70 transition-opacity hover:opacity-100"
            >
              {EMAIL}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              @malanga1companyltd
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @malanga1companyltd
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              @malanga1companyltd
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-earth-foreground/10 pt-12 text-xs font-medium tracking-widest uppercase opacity-40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Malanga 1 Company Limited.</p>
          <p>Built with Integrity in the North</p>
        </div>
      </div>
    </footer>
  );
}
