import { Request, Response, NextFunction } from 'express';
import { Client } from 'genius-lyrics';
import { ITrackInfo, ITrackLyrics, ITrackMetaInfo, getTrackInfo, getTrackMetaInfo, getTracks } from '../apis/spotify.api';

const geniusClient = new Client();

interface ISong extends ITrackInfo, ITrackMetaInfo, ITrackLyrics { }

const getSongs = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const title: string = req.query.title as string || "";
        const artists: string = req.query.artists as string || "";

        const trackList: ITrackInfo[] = await getTracks(title, artists);

        return res.status(200).json(trackList);
    } catch (err: any) {

        if (err instanceof Error) {
            return res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        }

        return res.status(500);
    }
};

const getSong = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id: string = req.params.id;

        // Track info
        const trackInfo: ITrackInfo = await getTrackInfo(id);

        // Track meta info
        const trackMetaInfo: ITrackMetaInfo = await getTrackMetaInfo(id);

        // Track lyrics
        const searches = await geniusClient.songs.search(`${trackInfo.title} ${trackInfo.artists.join(', ')}`.trim());
        const lyrics = await searches[0]?.lyrics() || "";
        
        const song: ISong = {
            albumCoverUrl: trackInfo.albumCoverUrl,
            albumName: trackInfo.albumName,
            albumReleaseDate: trackInfo.albumReleaseDate,
            artists: trackInfo.artists,
            chords: trackMetaInfo.chords,
            duration: trackMetaInfo.duration,
            id: trackInfo.id,
            key: trackMetaInfo.key,
            lyrics,
            mode: trackMetaInfo.mode,
            spotifyUrl: trackInfo.spotifyUrl,
            tempo: trackMetaInfo.tempo,
            timeSignature: trackMetaInfo.timeSignature,
            title: trackInfo.title,
        }

        return res.status(200).json(song);
    } catch (err: any) {

        if (err instanceof Error) {
            return res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        }

        return res.status(500);
    }
};

export default { getSongs, getSong };