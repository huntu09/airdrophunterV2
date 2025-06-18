import { type NextRequest, NextResponse } from "next/server"

const mockUsers = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    role: "user",
    join_date: "2024-06-15",
    last_active: "2024-06-16T10:30:00Z",
    airdrops_joined: 12,
    total_earnings: 1250.0,
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    role: "premium",
    join_date: "2024-06-14",
    last_active: "2024-06-16T09:15:00Z",
    airdrops_joined: 25,
    total_earnings: 3450.0,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const role = searchParams.get("role") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const filteredUsers = mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === "all" || user.status === status
      const matchesRole = role === "all" || user.role === role

      return matchesSearch && matchesStatus && matchesRole
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}
