import { Track } from '../interfaces/music';
import { appErrorStore } from '../stores/app-error-store';
import { userStore } from '../stores/user-store';

export enum APIErrorCodes {
  TOKEN,
  GENERAL,
  JWT,
}

const errorsMap: Record<string, APIErrorCodes> = {
  'Invalid token': APIErrorCodes.TOKEN,
  'jwt expired': APIErrorCodes.JWT,
  'User has no Spotify token': APIErrorCodes.TOKEN,
};

const apiService = {
  getTopMusic: async (): Promise<Track[] | APIErrorCodes> => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + '/music/top',
        {
          headers: {
            Authorization: 'Bearer ' + userStore.accessToken,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        if (errorsMap[err.message] !== APIErrorCodes.JWT) {
          appErrorStore.setError(err.message);
        }
        return errorsMap[err.message];
      }

      return APIErrorCodes.GENERAL;
    }
  },

  searchArtist: async (name: string): Promise<unknown> => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + '/music/search-artists',
        {
          headers: {
            Authorization: 'Bearer ' + userStore.accessToken,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        if (errorsMap[err.message] !== APIErrorCodes.JWT) {
          appErrorStore.setError(err.message);
        }
        return errorsMap[err.message];
      }

      return APIErrorCodes.GENERAL;
    }
  },
};

export default apiService;
