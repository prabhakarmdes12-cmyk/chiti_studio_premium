"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function AboutPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
      <FadeIn direction="left" className="order-2 md:order-1">
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.04]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKHdJS_zm5Dppq3C5UvxeLSDa30Z1Ydgi9vyYohyd8qQ4DnzBd9pkA_1gliovoY02ykWQPHHsy7atdr21A8y2sGwuVZns7m8MHbkKQo4K2Qtw3vSXlR9gZOidxcFNYBL2xTfkvpTTcCVa8Ec71hkiU_Q6aee_4v63YQIR1cvuYm_ykSPz-wQbQJBZFueSyLvnx0xzUVjEYCWtnvBZMvYKfYdr3dY-nR-QDrH6_oz6Rx9O7eBDXHDBBdEpwiaZAlQEhgBHdmVd6slU"
            alt="Creative team"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
      </FadeIn>

      <FadeIn direction="right" delay={0.15} className="order-1 md:order-2">
        <div className="flex flex-col gap-8">
          <span className="text-primary/60 font-label text-[11px] tracking-[0.3em] uppercase font-medium">
            The Collective
          </span>
          <h2 className="text-on-surface text-[2.5rem] font-extrabold font-headline leading-[1.12] tracking-[-0.03em]">
            Clean interfaces.{" "}
            <span className="gradient-text-aurora">Strong systems.</span>{" "}
            Better results.
          </h2>
          <p className="text-on-surface-variant/70 text-[16px] leading-[1.75] max-w-[420px]">
            Chiti Studio is a high-frequency collective of specialists dedicated
            to the art of digital craft. We partner with ambitious brands to
            navigate the new frontier of the digital economy.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-4 pt-8 border-t border-white/[0.04]">
            <div className="flex flex-col gap-1.5">
              <span className="text-on-surface text-2xl font-extrabold font-headline tracking-[-0.02em]">
                12+
              </span>
              <span className="text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.18em]">
                Disciplines
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-on-surface text-2xl font-extrabold font-headline tracking-[-0.02em]">
                24/7
              </span>
              <span className="text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.18em]">
                Innovation
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
