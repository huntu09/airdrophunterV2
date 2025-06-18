import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "7days"

    // Mock analytics data
    const analyticsData = {
      overview: {
        totalPageViews: 89432,
        uniqueVisitors: 23567,
        clickThroughRate: 12.4,
        revenue: 24567.89,
        changes: {
          pageViews: 15.3,
          visitors: 8.2,
          ctr: 2.1,
          revenue: -2.1,
        },
      },
      topAirdrops: [
        {
          name: "MEXC Exchange",
          views: 15432,
          clicks: 2341,
          ctr: 15.2,
          participants: 5432,
        },
        {
          name: "LayerZero",
          views: 12876,
          clicks: 1987,
          ctr: 15.4,
          participants: 8901,
        },
      ],
      trafficSources: [
        { source: "Direct", visitors: 12543, percentage: 45.2 },
        { source: "Social Media", visitors: 8976, percentage: 32.4 },
        { source: "Search Engines", visitors: 4321, percentage: 15.6 },
        { source: "Referrals", visitors: 1876, percentage: 6.8 },
      ],
      chartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Page Views",
            data: [8943, 7821, 9234, 8765, 7654, 8432, 7890],
          },
          {
            label: "Unique Visitors",
            data: [2356, 2145, 2567, 2234, 2098, 2187, 2034],
          },
        ],
      },
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
      period,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}
