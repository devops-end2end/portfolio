import { getSystemTopology } from '@/lib/topology';
import TopologyViewer from '@/components/TopologyViewer';

export default function TopologyPage() {
  const topologyData = getSystemTopology();

  return (
    <main className="min-h-screen bg-black py-12">
      <TopologyViewer data={topologyData} />
    </main>
  );
}
