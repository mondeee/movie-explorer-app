// movie.interface.ts

export interface Movie {
  trackId: number;
  trackName: string;
  shortDescription: string;
  longDescription: string;
  collectionName: string;
  trackPrice: Float32Array;
  artworkUrl100: string;
  primaryGenreName: string;
  isFavorite: boolean;
}
