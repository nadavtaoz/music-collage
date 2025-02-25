import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/user-store';
import SpotifyModal from '../components/pages/all/spotify-modal';

const Home = observer(() => {
  if (!userStore.isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div>
      Home
      <SpotifyModal />
    </div>
  );
});

export default Home;
