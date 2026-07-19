import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
};

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-10 flex items-center gap-4">
        <span className="font-mono text-sm text-[var(--accent)]">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-[var(--border-strong)]" />
      </div>
    </Reveal>
  );
}
