import { BeamGeneratorForm } from "@/components/beam-generator-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M2 20h20" />
                <path d="M5 20V8l7-5 7 5v12" />
                <path d="M12 20v-9" />
                <path d="M7.5 12h9" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">BeamCAD</h1>
              <p className="text-xs text-muted-foreground">Structural Model Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
              v1.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Generate Structural Beam Models
          </h2>
          <p className="mt-1 text-muted-foreground">
            Create precise 3D STEP files for FEA analysis. Select your beam type and configure dimensions below.
          </p>
        </div>
        
        <BeamGeneratorForm />
      </div>
    </main>
  )
}
