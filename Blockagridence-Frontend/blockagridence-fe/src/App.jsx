import { useState } from 'react';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Certificates from './pages/Farmer/Certificates/Certificates';
import CreateBatch from './pages/Farmer/CreateBatch/CreateBatch';
import BatchDetail from './pages/Farmer/BatchDetail/BatchDetail';
import TransferOwnership from './pages/Transporter/TransferOwnership/TransferOwnership';
import UpdateTransit from './pages/Transporter/UpdateTransit/UpdateTransit';
import ReceiveGoods from './pages/Retailer/ReceiveGoods/ReceiveGoods';
import RetailDashboard from './pages/Retailer/RetailDashboard/RetailDashboard';
import RiskManagement from './pages/Admin/RiskManagement/RiskManagement';
import Audit from './pages/Admin/Audit/Audit';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState('dashboard');

  // Xử lý luồng truy cập public cho người tiêu dùng quét QR
  if (currentPath === 'public-trace') {
    return (
      <PublicLayout>
        <Dashboard />
      </PublicLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthLayout>
        <Login 
          onLogin={() => setIsAuthenticated(true)} 
          onConsumerScan={() => setCurrentPath('public-trace')}
        />
      </AuthLayout>
    );
  }

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard':
        return <Dashboard />;
      // Farmer Role
      case 'certificates':
        return <Certificates />;
      case 'create-batch':
        return <CreateBatch />;
      case 'batch-detail':
        return <BatchDetail />;
      // Transporter Role
      case 'transfer-ownership':
        return <TransferOwnership />;
      case 'update-transit':
        return <UpdateTransit />;
      // Retailer Role
      case 'receive-goods':
        return <ReceiveGoods />;
      case 'retail-dashboard':
        return <RetailDashboard />;
      // Admin Role
      case 'risk-management':
        return <RiskManagement />;
      case 'audit':
        return <Audit />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout currentPath={currentPath} setCurrentPath={setCurrentPath}>
      {renderContent()}
    </DashboardLayout>
  );
}
