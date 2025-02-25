import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Album } from '../interfaces/music';
import useDashboard from '../hooks/use-dashboard';
import SpotifyModal from '../components/pages/all/spotify-modal';

export type DashboardState = {
  albums: Album[];
};

type DashboardContextValue = DashboardState & {
  // reducers
};

export const DashboardContext = createContext<DashboardContextValue | null>(
  null
);

type DashboardContextProviderProps = {
  children: ReactNode;
};

export default function DashboardContextProvider({
  children,
}: DashboardContextProviderProps) {
  const [tokenError, tracks] = useDashboard();

  const createAlbums = (): Album[] => {
    const albums = tracks.map((t) => t.album);
    const seen = new Set<string>(); // Store unique IDs
    return albums.filter((a) => !seen.has(a.name) && seen.add(a.name));
  };

  const ctx: DashboardState = {
    albums: createAlbums(),
  };

  if (tokenError) {
    return (
      <>
        <h2>Spotify token is missing</h2>
        <SpotifyModal />
      </>
    );
  }

  return (
    <DashboardContext.Provider value={ctx}>
      {children}
    </DashboardContext.Provider>
  );
}
