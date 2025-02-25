import { Track } from '../interfaces/music';
import { UserProfile } from '../interfaces/user-profile';

const USER_TOKEN: string = 'user_token';
const USER_PROFILE: string = 'user_profile';
const USER_TOP_TRACKS: string = 'user_top_tracks';

function storeJWT(token: string): void {
  localStorage.setItem(USER_TOKEN, token);
}

function storeUserProfile(userProfile: UserProfile): void {
  localStorage.setItem(USER_PROFILE, JSON.stringify(userProfile));
}

function storeUserTopTracks(tracks: Track[]): void {
  localStorage.setItem(USER_TOP_TRACKS, JSON.stringify(tracks));
}

function getUserTopTracks(): Track[] | null {
  const items = localStorage.getItem(USER_TOP_TRACKS);
  if (items) {
    return JSON.parse(items);
  }

  return null;
}

function clear(): void {
  localStorage.clear();
}

function getUserProfile(): UserProfile | null {
  const str = localStorage.getItem(USER_PROFILE);
  if (str) {
    try {
      const userProfile = JSON.parse(str);
      return userProfile as UserProfile;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  return null;
}

function getJWT(): string | null {
  return localStorage.getItem(USER_TOKEN);
}

const StorageService = {
  storeJWT,
  getJWT,
  storeUserProfile,
  getUserProfile,
  clear,
  storeUserTopTracks,
  getUserTopTracks,
};

export default StorageService;
