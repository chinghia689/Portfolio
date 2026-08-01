import { ArrowDown } from "lucide-react";

export function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-3">
      {steps.map((step, index) => (
        <div key={`${step}-${index}`} className="grid justify-items-center gap-3">
          <div className="w-full max-w-sm rounded-md border border-border bg-background px-4 py-3 text-center text-sm font-medium">
            {step}
          </div>
          {index < steps.length - 1 ? (
            <ArrowDown className="h-4 w-4 text-primary" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
