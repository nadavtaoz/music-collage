import { useNavigate } from 'react-router-dom';
import apiService, { APIErrorCodes } from '../services/api-service';
import { userStore } from '../stores/user-store';
import { useEffect, useState } from 'react';
import { isTrackArray, Track } from '../interfaces/music';
import StorageService from '../services/storage-service';

export default function useDashboard(): [boolean, Track[]] {
  const navigate = useNavigate();
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);

  const errorHandlers: Record<APIErrorCodes, () => void> = {
    [APIErrorCodes.TOKEN]: () => {
      setTokenError(true);
      userStore.deleteSpotifyToken();
    },
    [APIErrorCodes.GENERAL]: () => console.log('A general error occurred'),
    [APIErrorCodes.JWT]: () => {
      userStore.logout();
      navigate('/login');
    },
  };

  // Get the user's top tracks from api
  useEffect(() => {
    async function callApi() {
      const result = await apiService.getTopMusic();

      if (Object.values(APIErrorCodes).includes(result as APIErrorCodes)) {
        const cb = errorHandlers[result as APIErrorCodes];
        cb();
        return;
      }

      if (isTrackArray(result)) {
        setTracks(result);
        StorageService.storeUserTopTracks(result);
      }
    }

    const tracks = StorageService.getUserTopTracks();
    if (!tracks) {
      callApi();
    } else {
      setTracks(tracks);
    }
  }, []);

  return [tokenError, tracks];
}
