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
  Ingress --> HybridLB[Hybrid Anycast Gateway]
  HybridLB --> BareMetal[Bare Metal K8s DC]
  HybridLB --> CloudK8s[AWS EKS Clusters]
  BareMetal --> Cache[(NVMe Redis Shards)]
  CloudK8s --> Analytics[(ClickHouse / S3)]`
  },
  {
    id: "gitops-migration",
    title: "Zero-Downtime Multi-Cluster GitOps & Progressive Delivery",
    problem: "Manual release pipelines across 40+ microservices caused deployment drift, rollbacks, and developer friction.",
    solution: "Implemented ArgoCD, Flagger canary releases, and automated health checks driven by Prometheus metric thresholds.",
    metrics: ["10x Release Frequency", "0 Downtime Incidents", "< 2min Automated Rollback"],
    architecture: `graph TD
  Git[Git Repository] --> ArgoCD[ArgoCD Controller]
  ArgoCD --> K8sProd[Production Clusters]
  Flagger[Flagger Canary] --> Envoy[Envoy / Istio Mesh]
  Prometheus[Prometheus Metrics] --> Flagger
  Flagger --> Alert[Auto Rollback / Promotion]`
  }
];

function MermaidDiagram({ chart, id }: { chart: string; id: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = React.useState<string>("");

  React.useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: