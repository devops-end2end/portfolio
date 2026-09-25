"use client"
import * as React from "react"
import mermaid from "mermaid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { CareerData } from "@/lib/data"

export function CaseStudies({ studies }: { studies: CareerData['case_studies'] }) {
  const [selectedStudy, setSelectedStudy] = React.useState<CareerData['case_studies'][0] | null>(null)

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' })
  }, [])

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Flagship Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <Card 
            key={study.id} 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => setSelectedStudy(study)}
          >
            <CardHeader>
              <CardTitle>{study.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{study.problem}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {study.metrics.map(m => (
                  <Badge key={m} variant="secondary">{m}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStudy} onOpenChange={(o) => !o && setSelectedStudy(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedStudy && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedStudy.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4 text-sm text-foreground/90">
                <div>
                  <strong className="text-primary block mb-1">Problem:</strong>
                  {selectedStudy.problem}
                </div>
                <div>
                  <strong className="text-primary block mb-1">Solution:</strong>
                  {selectedStudy.solution}
                </div>
                <div>
                  <strong className="text-primary block mb-2">Architecture:</strong>
                  <div className="bg-muted p-4 rounded-md overflow-x-auto flex justify-center">
                    <MermaidDiagram chart={selectedStudy.architecture} id={`mermaid-${selectedStudy.id}`} />
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function MermaidDiagram({ chart, id }: { chart: string, id: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      mermaid.render(id, chart).then((result) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = result.svg
        }
      })
    }
  }, [chart, id])

  return <div ref={containerRef} />
}
