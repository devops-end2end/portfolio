"use client"
import * as React from "react"
import mermaid from "mermaid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  metrics: string[];
  architecture: string;
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "bare-metal-k8s",
    title: "Multi-Region Hybrid Bare-Metal & Cloud K8s Infrastructure",
    problem: "High latency in search bidding pipelines and escalating public cloud egress costs across multi-billion auction requests per day.",
    solution: "Architected and deployed bare-metal Kubernetes clusters co-located in high-speed datacenters paired with AWS hybrid ingress topologies.",
    metrics: ["-45% Egress Cost", "< 10ms Latency SLA", "99.999% Uptime"],
    architecture: `graph TD
  Client[Auction Bidders] --> Ingress[Cloudflare Edge]
  Ingress --> Hybrid[AWS Hybrid Ingress]
  Hybrid --> K8s[Bare-Metal Kubernetes Cluster]
  K8s --> Ceph[(Ceph Storage Cluster)]
  K8s --> VectorDB[(Vector DB Cluster)]`
  },
  {
    id: "gitops-pipeline",
    title: "Zero-Trust Enterprise GitOps & Automated Canary Rollouts",
    problem: "Manual release gates and fragmented environment configs caused frequent deployment bottlenecks and operational downtime.",
    solution: "Implemented ArgoCD GitOps pipelines paired with Prometheus metric analysis and automated canary deployments.",
    metrics: ["400% DORA Deployment Freq", "Sub-5m Rollbacks", "Zero-Trust Mesh"],
    architecture: `graph LR
  Git[Git Repository] --> ArgoCD[ArgoCD Controller]
  ArgoCD --> Canary[Argo Rollouts]
  Canary --> Prom[Prometheus Analysis]
  Prom -->|Metrics OK| Prod[Production Workloads]`
  }
];

export function CaseStudies({ studies = defaultCaseStudies }: { studies?: CaseStudy[] }) {
  const [selectedStudy, setSelectedStudy] = React.useState<CaseStudy | null>(null)

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' })
  }, [])

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-white">Flagship Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <Card 
            key={study.id} 
            className="cursor-pointer hover:border-zinc-500 bg-zinc-950 border-zinc-800 text-zinc-100 transition-colors"
            onClick={() => setSelectedStudy(study)}
          >
            <CardHeader>
              <CardTitle className="text-white text-xl">{study.title}</CardTitle>
              <CardDescription className="mt-2 text-zinc-400 line-clamp-2">{study.problem}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {study.metrics.map(m => (
                  <Badge key={m} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">{m}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStudy} onOpenChange={(o) => !o && setSelectedStudy(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-950 border-zinc-800 text-zinc-100">
          {selectedStudy && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">{selectedStudy.title}</DialogTitle>
                <DialogDescription className="text-zinc-400">Architecture Case Study Overview</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4 text-sm text-zinc-300">
                <div>
                  <strong className="text-blue-400 block mb-1">Problem Statement:</strong>
                  {selectedStudy.problem}
                </div>
                <div>
                  <strong className="text-emerald-400 block mb-1">Technical Solution:</strong>
                  {selectedStudy.solution}
                </div>
                <div>
                  <strong className="text-purple-400 block mb-2">Architecture Topology:</strong>
                  <div className="bg-zinc-900 p-4 rounded-md overflow-x-auto flex justify-center border border-zinc-800">
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

function MermaidDiagram({ chart, id }: { chart: string, id: string