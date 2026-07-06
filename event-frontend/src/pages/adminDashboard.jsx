import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useAdmin } from "../context/AdminContext";
import "./AdminDashboard.css";
import Sidebar from "../components/Sidebar.jsx"
function AdminDashboard() {
  const { adminOverview, revenueChart, loading } = useAdmin();

  if (loading) {
    return <main className="adminPage">Loading admin dashboard...</main>;
  }

  const chartData = revenueChart.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
    bookings: item.bookings,
  }));

  return (
    <main className="adminPage">
      <aside className="adminSidebar">
        <h1>EventX</h1>
        <a>Overview</a>
        <a>Pending Events</a>
        <a>Users</a>
        <a>Bookings</a>
        <a>Revenue</a>
      </aside>

      <section className="adminMain">
        <div className="adminHeader">
          <p>ADMIN PANEL</p>
          <h2>Revenue Monitoring</h2>
        </div>

        <div className="overviewGrid">
          <div className="overviewCard">
            <span>Total Revenue</span>
            <h3>₹{adminOverview.totalRevenue}</h3>
          </div>

          <div className="overviewCard">
            <span>Total Bookings</span>
            <h3>{adminOverview.totalBookings}</h3>
          </div>

          <div className="overviewCard">
            <span>Tickets Sold</span>
            <h3>{adminOverview.ticketsSold}</h3>
          </div>

          <div className="overviewCard">
            <span>Pending Events</span>
            <h3>{adminOverview.pendingEvents}</h3>
          </div>

          <div className="overviewCard">
            <span>Total Users</span>
            <h3>{adminOverview.totalUsers}</h3>
          </div>

          <div className="overviewCard">
            <span>Organisers</span>
            <h3>{adminOverview.totalOrganisers}</h3>
          </div>
        </div>

        <div className="chartCard">
          <h3>Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.1)" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#9b9bff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;