import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'

export default function Component() {
  const [month, setMonth] = useState('Mar')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/statistics`, {
          method: 'POST', // Changed to POST
          headers: {
            'Content-Type': 'application/json', // Added headers
          },
          body: JSON.stringify({ month }), // Sending month in the request body
        })
        const data = await response.json()
        console.log("data is here ", data)
        setStats(data)
      } catch (error) {
        console.error('Error fetching statistics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [month])

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Transactions Statistics
        <span className="text-sm font-normal text-muted-foreground ml-2">
          
        </span>
      </h1>

      <Card className="bg-[#f8fafc]">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            Statistics - 
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm font-normal text-muted-foreground">
              (Selected month name from dropdown)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : stats ? (
            <div className="bg-[#fef3c7] rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Total sale</span>
                <span className="font-medium">{stats.totalSaleAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Total sold item</span>
                <span className="font-medium">{stats.totalSoldItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Total not sold item</span>
                <span className="font-medium">{stats.totalNotSoldItems}</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Failed to load statistics
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
