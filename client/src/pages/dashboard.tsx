import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/user-store';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardContent from '../components/pages/dashboard/dashboard-content';
import DashboardTools from '../components/pages/dashboard/dashboard-tools';
import DashboardContextProvider from '../context/dashboard-context';

const Dashboard = () => {
  if (!userStore.isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <DashboardContextProvider>
      <h1 className="text-center">Your top albums</h1>
      <div className="flex items-stretch flex-col items-center md:flex-row md:gap-5">
        <div className="w-4/5">
          <DashboardContent />
        </div>
        <div className="flex-1">
          <DashboardTools />
        </div>
      </div>
    </DashboardContextProvider>
  );
};

export default observer(Dashboard);
