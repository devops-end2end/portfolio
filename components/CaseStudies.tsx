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