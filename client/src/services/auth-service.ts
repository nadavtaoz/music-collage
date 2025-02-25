import { UserProfile } from '../interfaces/user-profile';
import { userStore } from '../stores/user-store';

export type UserSignupData = {
  name: string;
  email: string;
  password: string;
  country: string;
};

/**
 * POST /auth/signup
 * @param data
 * @returns
 */
const signup = async (data: UserSignupData): Promise<unknown> => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_BASE_URL + '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * POST /auth/login
 * @param email
 * @param password
 * @returns
 */
const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as unknown;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * POST /auth/spotify_token
 * @param token
 * @returns
 */
const storeSpotifyToken = async (
  token: string,
  userId: string = ''
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + '/auth/spotify_token',
      {
        method: 'POST',
        body: JSON.stringify({
          token,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userStore.accessToken,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as UserProfile;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const authService = {
  login,
  signup,
  storeSpotifyToken,
};

export default authService;
