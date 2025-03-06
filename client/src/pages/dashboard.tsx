import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/user-store';
import { Navigate } from 'react-router-dom';
import DashboardContent from '../components/pages/dashboard/dashboard-content';
import DashboardTools from '../components/pages/dashboard/dashboard-tools';
import DashboardContextProvider from '../context/dashboard-context';
import { useState } from 'react';
import AddArtistsModal from '../components/pages/dashboard/add-artists-modal';

const Dashboard = () => {
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  if (!userStore.isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <DashboardContextProvider>
      <div className="relative">
        <h1 className="text-center">Your top albums</h1>
        {deleteMode && (
          <div className="absolute w-full text-center -bottom-7">
            <span className="text-yellow-300 text-lg">
              Click on the album you want to delete
            </span>
          </div>
        )}
      </div>

      <div className="flex items-stretch flex-col items-center md:flex-row md:gap-5">
        <div className="md:w-4/5">
          <DashboardContent
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
          />
        </div>
        <div className="flex-1">
          <DashboardTools
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
          />
        </div>
      </div>

      <AddArtistsModal />
    </DashboardContextProvider>
  );
};

export default observer(Dashboard);
