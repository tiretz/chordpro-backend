import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getChordsByKeyAndMode, getDurationInMinAndSec } from './utils';

interface IHeader {
    Authorization: string;
}

interface IRequestHeader {
    method: string;
    headers: IHeader;
}

interface IToken {
    bearer: string;
    expires: number;
}

export interface ITrackInfo {
    albumName: string;
    albumCoverUrl: string;
    albumReleaseDate: Date;
    artists: string[];
    id: string;
    spotifyUrl: string;
    title: string;
}

export interface ITrackMetaInfo {
    chords: string[];
    duration: string;
    key: string;
    mode: number;
    tempo: string;
    timeSignature: string;
}

export interface ITrackLyrics {
    lyrics: string;
}

const token: IToken = {
    bearer: "",
    expires: new Date().getTime(),
};

function getRequestHeader(authorizationToken: string): IRequestHeader {
    return {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authorizationToken}`
        }
    };
}

async function getBearerToken(): Promise<string | null> {

    const time: number = new Date().getTime();

    if (time > token.expires) {

        const urlToken: string = "https://accounts.spotify.com/api/token";

        const requestToken: any = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
        };

        try {
            const responseToken = await fetch(urlToken, requestToken);
            const objToken = await responseToken.json();

            token.bearer = objToken.access_token;
            token.expires = new Date().getTime() + 3500000;

            return token.bearer;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return token.bearer;
}

export async function getTracks(title: string, artists: string): Promise<ITrackInfo[]> {
    
    const spotifyBearer = await getBearerToken();

    if (!spotifyBearer)
        throw new Error("401");

    const response: AxiosResponse = await axios.get(`https://api.spotify.com/v1/search?q=remaster%2520track%3A${encodeURIComponent(encodeURIComponent(title))}%2520artist%3A${encodeURIComponent(encodeURIComponent(artists))}&type=track&limit=10`, <AxiosRequestConfig>getRequestHeader(spotifyBearer));

    if (response.status != 200)
        throw new Error(JSON.stringify({ code: response.status, statustext: response.statusText }));

    const data = response.data;

    const songList: ITrackInfo[] = data.tracks.items.map((item: any) => {
        return {
            albumCoverUrl: item.album.images[0].url,
            albumName: item.album.name,
            albumReleaseDate: new Date(Date.parse(item.release_date)),
            artists: item.artists.map((artist: any) => artist.name),
            id: item.id,
            title: item.name,
            spotifyUrl: item.external_urls.spotify,
        };
    });

    return songList;
}

export async function getTrackInfo(id: string): Promise<ITrackInfo> {
    
    const spotifyBearer = await getBearerToken();

    if (!spotifyBearer)
        throw new Error("401");

    const response: AxiosResponse = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, <AxiosRequestConfig>getRequestHeader(spotifyBearer));

    if (response.status != 200)
        throw new Error(JSON.stringify({ code: response.status, statustext: response.statusText }));

    const data = response.data;

    return {
        albumCoverUrl: data.album.images[0].url,
        albumName: data.album.name,
        albumReleaseDate: new Date(Date.parse(data.release_date)),
        artists: data.artists.map((artist: any) => artist.name),
        id: data.id,
        title: data.name,
        spotifyUrl: data.external_urls.spotify,
    };
}

export async function getTrackMetaInfo(id: string): Promise<ITrackMetaInfo> {
    
    const spotifyBearer = await getBearerToken();

    if (!spotifyBearer)
        throw new Error("401");

    const response: AxiosResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, <AxiosRequestConfig>getRequestHeader(spotifyBearer));

    if (response.status != 200)
        throw new Error(JSON.stringify({ code: response.status, statustext: response.statusText }));

    const data = response.data;

    return {
        chords: getChordsByKeyAndMode(data.key, data.mode),
        duration: getDurationInMinAndSec(data.duration_ms),
        key: data.key,
        mode: data.mode,
        tempo: data.tempo,
        timeSignature: `${data.time_signature}/4`,
    };
}