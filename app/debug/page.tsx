import { DebugImageTester } from "@/components/debug-image-tester"

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">🔧 Debug Tools</h1>
      <DebugImageTester />
    </div>
  )
}
