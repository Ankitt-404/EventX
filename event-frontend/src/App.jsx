import { useState } from 'react'
import './App.css'
import Home from './pages/home.jsx'
import EventsPage from './pages/events.jsx'
import Auth from './pages/Auth.jsx'
import EventDetails from './pages/eventDetails.jsx'
import BookingPage from './pages/bookingPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingConfirmed from './pages/bookingConfirmed.jsx'
import MyBookings from './pages/myBookings.jsx'
import MyTicket from './pages/myTickets.jsx'
import CancelBooking from './pages/cancelBooking.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import AdminRoute from './components/adminRoute.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import Profile from './pages/profile.jsx';
import CreateEvent from "./pages/createevent.jsx";
import DashboardLayout from './components/dashboardLayout.jsx'
import MyEvents from './pages/myEvents.jsx'
import AdminPendingEvents from './pages/adminPendingEvents.jsx'
import EventAttendees from './pages/eventAttendees.jsx'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <DashboardLayout>
          <Home />
          </DashboardLayout>
        } />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/events/:eventId" element={<EventDetails/>} />
        <Route path="/book/:eventId" element={<BookingPage />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-ticket/:bookingId" element={<MyTicket />} />
        <Route path="/cancel-booking/:bookingId" element={<CancelBooking />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route
  path="/organiser/my-events"
  element={
    <DashboardLayout>
      <MyEvents />
    </DashboardLayout>
  }
/>
<Route
  path="/admin/pending-events"
  element={
    <DashboardLayout>
      <AdminPendingEvents />
    </DashboardLayout>
  }
/>
    <Route
  path="/admin"
  element={
    <AdminProvider>
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </AdminProvider>
  }
/>
<Route
  path="/organiser/events/:eventId/attendees"
  element={
    <DashboardLayout>
      <EventAttendees />
    </DashboardLayout>
  }
/>
 </Routes>
    </BrowserRouter>
  )
}

export default App
