import {
  Area,
  AreaChart,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
export default function Dashboard () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [typeSold, setTypeSold] = useState([])
  const [recentlyOrder, setRecentlyOrder] = useState([])
  const [dataDashboard, setDataDashboard] = useState([
    {
      name: 'User',
      value: 0
    },
    {
      name: 'Revenue Of The Year',
      value: 0
    },
    {
      name: 'Revenue Today',
      value: 0
    },
    {
      name: 'Product Sold',
      value: 0
    }
  ])
  const colorStatus = [
    { name: 'pending', color: 'bg-orange-500' },
    { name: 'processing', color: 'bg-blue-500' },
    { name: 'shipped', color: 'bg-teal-500' },
    { name: 'delivered', color: 'bg-green-500' },
    { name: 'cancelled', color: 'bg-red-500' }
  ]
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']

  const [revenueData, setRevenueData] = useState([])
  const updatePreData = (name, newValue) => {
    setDataDashboard(prev =>
      prev.map(item =>
        item.name === name ? { ...item, value: newValue } : item
      )
    )
  }
  const calRevenue = async () => {
    try {
      const res = await fetch(`${API_BASE}/calrevenue`, {
        method: 'GET'
      })
      const data = await res.json()
      const formattedData = data.map(item => ({
        ...item,
        revenue: Number(item.revenue) // Ép kiểu về số
      }))
      setRevenueData(formattedData)
    } catch (error) {
      console.error(error)
    }
  }
  const countTypeSold = async () => {
    try {
      const res = await fetch(`${API_BASE}/typesold`, {
        method: 'GET'
      })
      const data = await res.json()

      // Chuyển value từ string sang number
      const formattedData = data.map(item => ({
        ...item,
        quantity: Number(item.quantity) // Ép kiểu về số
      }))
      setTypeSold(formattedData) // Cập nhật state
    } catch (error) {
      console.error(error)
    }
  }
  const countUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/countuser`, {
        method: 'GET'
      })
      const data = await res.json()
      // console.log(data)
      updatePreData('User', Number(data)) // Cập nhật state
    } catch (error) {
      console.error(error)
    }
  }
  const revenueOfYear = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/revenuedayyear?d=year`,
        {
          method: 'GET'
        }
      )
      const data = await res.json()
      updatePreData('Revenue Of The Year', data[0].total) // Cập nhật state
    } catch (error) {
      console.error(error)
    }
  }
  const revenueOfDay = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/revenuedayyear?d=day`,
        {
          method: 'GET'
        }
      )
      const data = await res.json()
      updatePreData('Revenue Today', data[0].total) // Cập nhật state
    } catch (error) {
      console.error(error)
    }
  }
  const countOrder = async () => {
    try {
      const res = await fetch(`${API_BASE}/countsold`, {
        method: 'GET'
      })
      const data = await res.json()
      updatePreData('Product Sold', data[0].total) // Cập nhật state
    } catch (error) {
      console.error(error)
    }
  }
  const recentlyOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/checkrencently`, {
        method: 'GET'
      })
      const data = await res.json()
      setRecentlyOrder(data)
      console.log(recentlyOrder)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      countTypeSold()
      calRevenue()
      countUsers()
      revenueOfYear()
      revenueOfDay()
      countOrder()
      recentlyOrders()
    }, 500) // Delay 2 giây

    return () => clearTimeout(timer) // Cleanup để tránh memory leak
  })

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <div className='p-8 space-y-8 bg-gray-100 min-h-screen w-full'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {dataDashboard.map((item, index) => (
          <div
            key={index}
            className='shadow-lg rounded-xl bg-white p-6 text-center'
          >
            <h2 className='text-lg font-semibold text-gray-600'>{item.name}</h2>
            <p className='text-3xl font-bold text-gray-800'>
              {item.name === 'Revenue Of The Year' ||
              item.name === 'Revenue Today'
                ? `$${item.value}`
                : item.value}
            </p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {revenueData ? (
          <div className='shadow-lg rounded-xl bg-white p-6'>
            <h2 className='text-lg font-semibold mb-4 text-gray-700'>
              Revenue Chart
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 'auto']} tickCount={6} />
                <Tooltip />
                {/* Fill màu dưới line */}
                <Area
                  type='monotone'
                  dataKey='revenue'
                  stroke='#8884d8'
                  fill='#8884d8'
                  fillOpacity={0.4} // Tăng độ rõ ràng của màu fill
                />

                <Line
                  type='monotone'
                  dataKey='revenue'
                  stroke='#8884d8'
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div>skibidi</div>
          // <div className='shadow-lg rounded-xl bg-white p-6'>
          //   <h2 className='text-lg font-semibold mb-4 text-gray-700'>
          //     Revenue Chart
          //   </h2>
          //   <ResponsiveContainer width='100%' height={300}>
          //     <LineChart
          //       width={500}
          //       height={300}
          //       margin={{
          //         top: 5,
          //         right: 30,
          //         left: 20,
          //         bottom: 5
          //       }}
          //     >
          //       <CartesianGrid strokeDasharray='3 3' />
          //       <XAxis dataKey='month' />
          //       <YAxis dataKey='revenue' />
          //       <Tooltip />
          //       <Legend />
          //       <Line
          //         type='monotone'
          //         dataKey='revenue'
          //         stroke='#8884d8'
          //         activeDot={{ r: 8 }}
          //       />
          //     </LineChart>
          //   </ResponsiveContainer>
          // </div>
        )}

        <div className='shadow-lg rounded-xl bg-white p-6 '>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>
            Product Sales
          </h2>
          {typeSold.length > 0 ? (
            <PieChart width={400} height={250} className='mx-auto'>
              <Pie
                data={typeSold}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill='#8884d8'
                dataKey='quantity' // Đảm bảo API trả về đúng key này
                nameKey='nametype' // Thêm nameKey để lấy tên sản phẩm làm nhãn
              >
                {typeSold.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout='vertical' align='right' verticalAlign='middle' />
            </PieChart>
          ) : (
            <p className='text-center text-gray-500'>No sales data available</p>
          )}
        </div>
      </div>

      <div className='shadow-lg rounded-xl bg-white p-6'>
        <h2 className='text-lg font-semibold mb-4 text-gray-700'>
          Recently Orders
        </h2>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='p-3'>Name</th>
              <th className='p-3'>Items</th>
              <th className='p-3'>Payment</th>
              <th className='p-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentlyOrder.map((order, index) => (
              <tr key={index} className='border-b hover:bg-gray-100'>
                <td className='p-3'>{order.name_order}</td>
                <td className='p-3 max-w-[400px] pr-6 '>
                  {order.product_names}
                </td>
                <td className='p-3 capitalize'>{order.payment_method}</td>
                <td className={`p-3 font-bold capitalize `}>
                  <p
                    className={`w-fit px-2 py-1 rounded-2xl text-white font-medium   ${
                      colorStatus.find(color => color.name === order.status)
                        .color
                    }`}
                  >
                    {' '}
                    {order.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
