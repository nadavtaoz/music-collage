import { makeAutoObservable } from 'mobx';
import { UserProfile } from '../interfaces/user-profile';
import StorageService from '../services/storage-service';

class UserStore {
  accessToken: string | null = null;
  userProfile: UserProfile | null = null;

  constructor() {
    makeAutoObservable(this);
    const userProfile = StorageService.getUserProfile();
    const token = StorageService.getJWT();
    if (userProfile) {
      userProfile.hasSpotifyToken =
        userProfile.hasSpotifyToken ?? !!userProfile.spotifyToken;

      this.userProfile = userProfile;
    }

    if (token) {
      this.accessToken = token;
    }
  }

  // Computed getter - Automatically updates when accessToken changes
  get isLoggedIn() {
    return !!this.accessToken;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  setUserProfile(profile: UserProfile | null) {
    if (profile) {
      profile.hasSpotifyToken =
        profile.hasSpotifyToken ?? !!profile.spotifyToken;
    }
    this.userProfile = profile;
  }

  deleteSpotifyToken() {
    if (this.userProfile) {
      this.userProfile.hasSpotifyToken = false;
    }
  }

  logout() {
    this.accessToken = null;
    this.userProfile = null;
  }
}

export const userStore = new UserStore();
