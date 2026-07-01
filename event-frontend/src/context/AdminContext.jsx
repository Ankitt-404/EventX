import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const admin = useAdmin()
  console.log(admin)
  const [adminOverview, setAdminOverview] = useState(null);
  const [revenueChart, setRevenueChart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const overviewRes = await api.get("/admin/overview");
      const chartRes = await api.get("/admin/revenue-chart");

      setAdminOverview(overviewRes.data.data);
      setRevenueChart(chartRes.data.data);
    } catch (error) {
      console.error("Admin data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        adminOverview,
        revenueChart,
        loading,
        fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () =>{ 
  return useContext(AdminContext)
};