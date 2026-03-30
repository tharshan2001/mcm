import React, { useState, useEffect } from "react";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Loader2,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { 
  getDashboardStats, 
  getDashboardSales, 
  getRevenueChart,
  getTopProducts 
} from "../../service/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [sales, setSales] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      
      let statsData = null;
      let salesData = null;
      let revenueChartData = [];
      let productsData = [];
      
      try {
        statsData = await getDashboardStats();
      } catch (e) { console.error("Stats error:", e); }
      
      try {
        salesData = await getDashboardSales();
      } catch (e) { console.error("Sales error:", e); }
      
      try {
        revenueChartData = await getRevenueChart(30);
      } catch (e) { console.error("Revenue chart error:", e); }
      
      try {
        productsData = await getTopProducts(5);
      } catch (e) { console.error("Top products error:", e); }
      
      setStats(statsData);
      setSales(salesData);
      setRevenueData(revenueChartData || []);
      setTopProducts(productsData || []);
      
      console.log("Revenue chart data:", revenueChartData);
    } catch (err) {
      console.error("Failed to load dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(value || 0);
  };

  const formatChartDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-stone-50 h-[700px] p-4 lg:p-8">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin text-stone-400" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 h-[700px] p-4 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">Dashboard</h1>
          <p className="text-sm text-stone-500 mt-1">Overview of your store performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Customers</p>
                <p className="text-2xl font-bold text-stone-800 mt-1">{stats?.totalCustomers || 0}</p>
              </div>
              <div className="p-3 bg-stone-100 rounded-lg">
                <Users size={22} className="text-[#5C4033]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Products</p>
                <p className="text-2xl font-bold text-stone-800 mt-1">{stats?.totalProducts || 0}</p>
              </div>
              <div className="p-3 bg-stone-100 rounded-lg">
                <Package size={22} className="text-[#5C4033]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Orders</p>
                <p className="text-2xl font-bold text-stone-800 mt-1">{stats?.totalOrders || 0}</p>
              </div>
              <div className="p-3 bg-stone-100 rounded-lg">
                <ShoppingCart size={22} className="text-[#5C4033]" />
              </div>
            </div>
          </div>

          <div className="bg-[#5C4033] p-4 rounded-lg border border-[#4A332A]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-300 uppercase tracking-wider">Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">{formatCurrency(stats?.totalRevenue)}</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <DollarSign size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        {sales && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-stone-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone-500 uppercase tracking-wider">Today</span>
                <TrendingUp size={16} className="text-amber-700" />
              </div>
              <p className="text-lg font-bold text-stone-800">{formatCurrency(sales.today?.totalRevenue)}</p>
              <p className="text-xs text-stone-400 mt-1">{sales.today?.totalOrders || 0} orders</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-stone-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone-500 uppercase tracking-wider">This Week</span>
                <TrendingUp size={16} className="text-amber-700" />
              </div>
              <p className="text-lg font-bold text-stone-800">{formatCurrency(sales.week?.totalRevenue)}</p>
              <p className="text-xs text-stone-400 mt-1">{sales.week?.totalOrders || 0} orders</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-stone-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone-500 uppercase tracking-wider">This Month</span>
                <TrendingUp size={16} className="text-amber-700" />
              </div>
              <p className="text-lg font-bold text-stone-800">{formatCurrency(sales.month?.totalRevenue)}</p>
              <p className="text-xs text-stone-400 mt-1">{sales.month?.totalOrders || 0} orders</p>
            </div>
          </div>
        )}

        {/* Charts & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg border border-stone-200 p-4">
            <h2 className="text-sm font-medium text-stone-700 mb-3">Revenue (Last 30 Days)</h2>
            <div className="h-[240px]">
              {revenueData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-stone-400 text-sm">
                  No revenue data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatChartDate}
                      tick={{ fontSize: 8 }}
                      stroke="#a8a29e"
                      interval={6}
                    />
                    <YAxis 
                      tickFormatter={(v) => `LKR ${v}`}
                    tick={{ fontSize: 8 }}
                    stroke="#a8a29e"
                    width={45}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={formatChartDate}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '11px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#5C4033" 
                    fill="#5C4033" 
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between shrink-0">
              <h2 className="text-sm font-medium text-stone-700">Top Products</h2>
              <button 
                onClick={() => navigate('/admin/product-list')}
                className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-y-auto h-[160px]">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div 
                    key={product.productId}
                    className="px-4 py-2 flex items-center justify-between hover:bg-stone-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-medium text-stone-500">
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium text-stone-800 truncate max-w-[120px]">{product.productName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-stone-600">{product.quantitySold} sold</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-stone-400 text-xs">No products yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
