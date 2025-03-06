import { useContext } from 'react';
import { DashboardContext } from '../../../context/dashboard-context';
import { debounce } from '../../../util/debounce';

type DashboardToolsProps = {
  setDeleteMode: (mode: boolean) => void;
  deleteMode: boolean;
};

export default function DashboardTools({
  deleteMode,
  setDeleteMode,
}: DashboardToolsProps) {
  const dashboardContext = useContext(DashboardContext);

  const handleRefreshClick = () => {
    dashboardContext?.refreshAlbums();
  };

  const handleRefreshFromSpotifyClick = () => {
    dashboardContext?.refreshFromSpotify();
  };

  const handleRefreshFromSpotifyClickDebounce = debounce(
    handleRefreshFromSpotifyClick,
    2000
  );

  const handleDeleteClick = () => setDeleteMode(!deleteMode);

  return (
    <div className="py-2 lg:px-2 h-full">
      <div className="p-2 border border-sgreen rounded-lg h-full flex gap-2 md:flex-col md:items-center">
        <button
          className="button"
          onClick={handleRefreshClick}
          disabled={deleteMode}
        >
          Refresh
        </button>
        <button
          disabled={deleteMode}
          className="button"
          onClick={handleRefreshFromSpotifyClickDebounce}
        >
          Refresh from Spotify
        </button>
        <button className="button" disabled={deleteMode}>
          Add
        </button>
        <button
          className={`button ${deleteMode && 'border-4'}`}
          onClick={handleDeleteClick}
        >
          Delete Album
        </button>
      </div>
    </div>
  );
}
