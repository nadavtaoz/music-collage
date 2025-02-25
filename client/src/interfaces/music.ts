export interface Artist {
  id: string;
  name: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface Album {
  images: Image[];
  name: string;
  artists: Artist[];
}

export interface Track {
  album: Album;
  name: string;
}

export function isTrackArray(arr: any): arr is Track[] {
  return (
    Array.isArray(arr) &&
    arr.every((item) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.name === 'string' &&
        typeof item.album === 'object' &&
        item.album !== null &&
        typeof item.album.name === 'string' &&
        Array.isArray(item.album.images) &&
        item.album.images.every((img: any) => typeof img === 'object') &&
        Array.isArray(item.album.artists) &&
        item.album.artists.every(
          (artist: { id: any; name: any } | null) =>
            typeof artist === 'object' &&
            artist !== null &&
            typeof artist.id === 'string' &&
            typeof artist.name === 'string'
        )
      );
    })
  );
}
