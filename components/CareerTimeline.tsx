"use client"
import * as React from "react"
import { Badge } from "./ui/badge"
import { CareerData } from "@/lib/data"

export function CareerTimeline({ experience }: { experience: CareerData['experience'] }) {
  return (
    <section className="py-12 border-t border-border mt-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Career Experience</h2>
      <div className="space-y-12">
        {experience.map((job, idx) => (
          <div key={idx} className="relative pl-6 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
              <div className="mb-4 md:mb-0 md:col-span-1 text-sm text-muted-foreground mt-1">
                {job.tenure}
              </div>
              <div className="md:col-span-3 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{job.company}</h3>
                  <div className="text-sm font-medium text-primary mt-1">
                    {job.roles.join(" • ")}
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  {job.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
