"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { BeamPreview } from "@/components/beam-preview"

type BeamType = "I_BEAM" | "T_BEAM" | "CIRCULAR" | "RECT"

interface Dimensions {
  length: number
  diameter: number
  width: number
  height: number
  flangeThickness: number
  webThickness: number
}

interface OutputConfig {
  fileName: string
  directory: string
}

interface BeamRequest {
  beamConfiguration: {
    type: BeamType
    dimensions: Dimensions
  }
  output: OutputConfig
}

const BEAM_TYPE_LABELS: Record<BeamType, string> = {
  I_BEAM: "I-Beam",
  T_BEAM: "T-Beam",
  CIRCULAR: "Circular",
  RECT: "Rectangular",
}

const BEAM_TYPE_DESCRIPTIONS: Record<BeamType, string> = {
  I_BEAM: "Standard I-section beam with two flanges",
  T_BEAM: "T-section beam with single flange",
  CIRCULAR: "Solid circular cross-section",
  RECT: "Solid rectangular cross-section",
}

const RELEVANT_FIELDS: Record<BeamType, (keyof Dimensions)[]> = {
  I_BEAM: ["length", "width", "height", "flangeThickness", "webThickness"],
  T_BEAM: ["length", "width", "height", "flangeThickness", "webThickness"],
  CIRCULAR: ["length", "diameter"],
  RECT: ["length", "width", "height"],
}

const FIELD_LABELS: Record<keyof Dimensions, string> = {
  length: "Length (Z-axis)",
  diameter: "Diameter",
  width: "Width",
  height: "Height",
  flangeThickness: "Flange Thickness (tf)",
  webThickness: "Web Thickness (tw)",
}

const FIELD_DESCRIPTIONS: Record<keyof Dimensions, string> = {
  length: "Total beam length along extrusion axis",
  diameter: "Outer diameter for circular sections",
  width: "Total width of the cross-section",
  height: "Total height of the cross-section",
  flangeThickness: "Thickness of horizontal flange plates",
  webThickness: "Thickness of vertical web plate",
}

export function BeamGeneratorForm() {
  const [beamType, setBeamType] = useState<BeamType>("I_BEAM")
  const [dimensions, setDimensions] = useState<Dimensions>({
    length: 600,
    diameter: 50,
    width: 120,
    height: 180,
    flangeThickness: 15,
    webThickness: 10,
  })
  const [output, setOutput] = useState<OutputConfig>({
    fileName: "beam_model.step",
    directory: "/Users/akshat/IdeaProjects/UG_Project/generated_models/",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [highlightedField, setHighlightedField] = useState<keyof Dimensions | null>(null)

  const relevantFields = RELEVANT_FIELDS[beamType]

  const handleDimensionChange = (field: keyof Dimensions, value: string) => {
    setDimensions((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }))
  }

  const handleOutputChange = (field: keyof OutputConfig, value: string) => {
    setOutput((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    const request: BeamRequest = {
      beamConfiguration: {
        type: beamType,
        dimensions,
      },
      output,
    }

    console.log("[v0] Submitting request:", request)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const endpoint = `${apiUrl}/api/cad/generate-fea`
      console.log("[v0] Fetching:", endpoint)
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.log("[v0] Error response:", errorText)
        throw new Error(`Generation failed: ${response.status} ${response.statusText}. ${errorText}`)
      }

      const blob = await response.blob()
      console.log("[v0] Received blob, size:", blob.size)
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = output.fileName || "beam_model.step"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      console.log("[v0] Download triggered successfully")
    } catch (err) {
      console.error("[v0] Submit error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Is your backend running?")
    } finally {
      setIsLoading(false)
    }
  }

  const isFieldRelevant = (field: keyof Dimensions) => relevantFields.includes(field)

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Panel */}
      <div className="order-last lg:order-first">
        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="space-y-6">
            {/* Beam Type Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="beamType" className="text-sm font-medium">Beam Type</Label>
                <span className="text-xs text-muted-foreground">Select profile</span>
              </div>
              <Select value={beamType} onValueChange={(value) => setBeamType(value as BeamType)}>
                <SelectTrigger id="beamType" className="h-12 bg-background">
                  <SelectValue placeholder="Select beam type" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(BEAM_TYPE_LABELS) as BeamType[]).map((type) => (
                    <SelectItem key={type} value={type} className="py-3">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{BEAM_TYPE_LABELS[type]}</span>
                        <span className="text-xs text-muted-foreground">{BEAM_TYPE_DESCRIPTIONS[type]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dimensions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                  <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
                  <path d="M4 12h16" />
                </svg>
                <h3 className="text-sm font-medium text-foreground">Dimensions</h3>
                <span className="ml-auto text-xs text-muted-foreground">Hover to highlight in preview</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(Object.keys(FIELD_LABELS) as (keyof Dimensions)[]).map((field) => {
                  const isRelevant = isFieldRelevant(field)
                  return (
                    <div
                      key={field}
                      className={`group relative rounded-lg border p-3 transition-all duration-200 ${
                        isRelevant
                          ? "border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                          : "border-border/40 bg-muted/20 opacity-40"
                      } ${highlightedField === field ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
                      onMouseEnter={() => isRelevant && setHighlightedField(field)}
                      onMouseLeave={() => setHighlightedField(null)}
                    >
                      {isRelevant && (
                        <span className="absolute -top-2 right-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                          Active
                        </span>
                      )}
                      <Label
                        htmlFor={field}
                        className={`text-xs font-medium ${isRelevant ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {FIELD_LABELS[field]}
                      </Label>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Input
                          id={field}
                          type="number"
                          step="0.1"
                          min="0"
                          value={dimensions[field]}
                          onChange={(e) => handleDimensionChange(field, e.target.value)}
                          onFocus={() => isRelevant && setHighlightedField(field)}
                          onBlur={() => setHighlightedField(null)}
                          disabled={!isRelevant}
                          className={`h-9 bg-background ${isRelevant ? "" : "cursor-not-allowed"}`}
                        />
                        <span className="text-xs text-muted-foreground">mm</span>
                      </div>
                      <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{FIELD_DESCRIPTIONS[field]}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Output Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-accent">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v6h6" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                </svg>
                <h3 className="text-sm font-medium text-foreground">Output Configuration</h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fileName" className="text-xs font-medium">File Name</Label>
                  <Input
                    id="fileName"
                    type="text"
                    value={output.fileName}
                    onChange={(e) => handleOutputChange("fileName", e.target.value)}
                    placeholder="beam_model.step"
                    className="h-9 bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="directory" className="text-xs font-medium">Output Directory</Label>
                  <Input
                    id="directory"
                    type="text"
                    value={output.directory}
                    onChange={(e) => handleOutputChange("directory", e.target.value)}
                    placeholder="/generated_models/"
                    className="h-9 bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 text-destructive">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button type="button" onClick={handleSubmit} className="h-12 w-full text-sm font-medium" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Generating Model...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Generate STEP File
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="order-first lg:order-last">
        <div className="sticky top-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Cross-Section Preview</h3>
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
              {BEAM_TYPE_LABELS[beamType]}
            </span>
          </div>
          <div className="aspect-square w-full">
            <BeamPreview beamType={beamType} highlightedField={highlightedField} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M12 20h9" />
              <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
            </svg>
            <span>Hover over dimension fields to highlight</span>
          </div>
        </div>
      </div>
    </div>
  )
}
