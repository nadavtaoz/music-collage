import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { Album } from '../interfaces/music';
import useDashboard from '../hooks/use-dashboard';
import SpotifyModal from '../components/pages/all/spotify-modal';

export type DashboardState = {
  albums: Album[];
  displayedAlbums: Album[];
  deleteAlbum: (target: number) => void;
  swapDisplayedAlbums: (target: number, source: number) => void;
  refreshFromSpotify: () => void;
  refreshAlbums: () => void;
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

type DisplayedAlbumsState = {
  displayedAlbums: Album[];
};

type SetDisplayedAlbumsAction = {
  type: 'SET_ALBUMS';
  payload: {
    albums: Album[];
  };
};

type RefreshAlbumsAction = {
  type: 'REFRESH_ALBUMS';
};

type DeleteAlbumAction = {
  type: 'DELETE_ALBUM';
  payload: {
    target: number;
  };
};

type SwapAlbumsAction = {
  type: 'SWAP_ALBUMS';
  payload: {
    target: number;
    source: number;
  };
};

type DisplayedAlbumsAction =
  | RefreshAlbumsAction
  | SwapAlbumsAction
  | DeleteAlbumAction
  | SetDisplayedAlbumsAction;

function displayedAlbumsReducer(
  state: DisplayedAlbumsState,
  action: DisplayedAlbumsAction
): DisplayedAlbumsState {
  if (action.type === 'SET_ALBUMS') {
    const { albums } = action.payload;
    return {
      ...state,
      displayedAlbums: albums,
    };
  }

  if (action.type === 'SWAP_ALBUMS') {
    const { target, source } = action.payload;

    // Swap images
    const newDisplayedAlbums = [...state.displayedAlbums];
    [newDisplayedAlbums[target], newDisplayedAlbums[source]] = [
      newDisplayedAlbums[source],
      newDisplayedAlbums[target],
    ];

    return {
      ...state,
      displayedAlbums: newDisplayedAlbums,
    };
  }

  if (action.type === 'DELETE_ALBUM') {
    const { target } = action.payload;
    const newDisplayedAlbums = state.displayedAlbums.filter(
      (_album, index) => index !== target
    );

    return {
      ...state,
      displayedAlbums: newDisplayedAlbums,
    };
  }

  return state;
}

export default function DashboardContextProvider({
  children,
}: DashboardContextProviderProps) {
  const [tokenError, tracks, refreshFromAPI] = useDashboard();

  const createAlbums = (): Album[] => {
    const albums = tracks.map((t) => t.album);
    const seen = new Set<string>(); // Store unique IDs
    return albums.filter((a) => !seen.has(a.name) && seen.add(a.name));
  };

  const albums = createAlbums();
  const [displayedAlbumsState, displayedAlbumsDispatch] = useReducer(
    displayedAlbumsReducer,
    {
      displayedAlbums: albums,
    }
  );

  useEffect(() => {
    if (tracks.length) {
      displayedAlbumsDispatch({
        type: 'SET_ALBUMS',
        payload: {
          albums: createAlbums(),
        },
      });
    }
  }, [tracks]);

  const ctx: DashboardState = {
    albums: [...albums],
    displayedAlbums: displayedAlbumsState.displayedAlbums,
    refreshFromSpotify() {
      refreshFromAPI();
    },
    deleteAlbum(target: number) {
      displayedAlbumsDispatch({
        type: 'DELETE_ALBUM',
        payload: {
          target,
        },
      });
    },
    refreshAlbums() {
      displayedAlbumsDispatch({
        type: 'SET_ALBUMS',
        payload: {
          albums: createAlbums(),
        },
      });
    },
    swapDisplayedAlbums(target: number, source: number) {
      displayedAlbumsDispatch({
        type: 'SWAP_ALBUMS',
        payload: {
          target,
          source,
        },
      });
    },
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
