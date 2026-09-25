"use client"
import * as React from "react"
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"

const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30, fontSize: 12 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  header: { fontSize: 24, marginBottom: 10 },
  subHeader: { fontSize: 16, marginBottom: 10, color: '#444' },
  text: { marginBottom: 5 }
})

const ResumePDF = ({ role }: { role: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Senior Engineering Manager & Architect</Text>
        <Text style={styles.subHeader}>Tailored for: {role}</Text>
        <Text style={styles.text}>New York, NY</Text>
        <Text style={styles.text}>More details can be customized here based on the selected role.</Text>
      </View>
    </Page>
  </Document>
)

export function ResumeGenerator({ currentRole }: { currentRole: string }) {
  const [open, setOpen] = React.useState(false)
  const [isGenerating, setIsGenerating] = React.useState(false)

  React.useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-resume-modal', handler)
    return () => window.removeEventListener('open-resume-modal', handler)
  }, [])

  const handleDownload = async () => {
    setIsGenerating(true)
    const blob = await pdf(<ResumePDF role={currentRole} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Resume_${currentRole}.pdf`
    link.click()
    URL.revokeObjectURL(url)
    setIsGenerating(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Tailored Resume</DialogTitle>
          <DialogDescription>
            Generate a PDF resume customized for the {currentRole} persona.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDownload} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
