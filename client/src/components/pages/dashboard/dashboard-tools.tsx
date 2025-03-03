import { useContext } from 'react';
import { DashboardContext } from '../../../context/dashboard-context';
import { debounce } from '../../../util/debounce';

export default function DashboardTools() {
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

  return (
    <div className="py-2 lg:px-2 h-full">
      <div className="p-2 border border-sgreen rounded-lg h-full flex gap-2 md:flex-col md:items-center">
        <button className="button" onClick={handleRefreshClick}>
          Refresh
        </button>
        <button
          className="button"
          onClick={handleRefreshFromSpotifyClickDebounce}
        >
          Refresh from Spotify
        </button>
        <button className="button">Add</button>
      </div>
    </div>
  );
}
