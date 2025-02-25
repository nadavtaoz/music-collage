export interface UserProfile {
	userId: string;
	name: string;
	email: string;
	avatarUrl?: string;
	hasSpotifyToken: boolean;
	spotifyToken?: string;
}
