export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 px-6 sm:px-12 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          &copy; {year} Waka Creative. All rights reserved.
        </p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          Built by{" "}
          <span className="text-accent font-semibold">ayyashcihuy</span>
          {" "}&amp;{" "}
          <span className="text-foreground/60 font-semibold">Waka Builder</span>
        </p>
      </div>
    </footer>
  );
}
