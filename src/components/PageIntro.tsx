import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  copy?: ReactNode;
  side?: ReactNode;
}

export function PageIntro({ eyebrow, title, copy, side }: PageIntroProps) {
  return (
    <section className="page-intro shell page-enter">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="page-intro__grid">
        <h1>{title}</h1>
        {copy ? <div className="page-intro__copy">{copy}</div> : null}
        {side ? <div className="page-intro__side">{side}</div> : null}
      </div>
    </section>
  );
}
