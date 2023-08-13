export function getChordsByKeyAndMode(key: number, mode: number): string[] {

    let chords: string[];

    switch (`${key}_${mode}`) {

        case '0_0':
            chords = ["Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb"];
            break;

        case '0_1':
            chords = ["C", "Dm", "Em", "F", "G", "Am", "B°"];
            break;

        case '1_0':
            chords = ["C#m", "D#°", "E", "F#m", "G#m", "A", "B"];
            break;

        case '1_1':
            chords = ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "C°"];
            break;
        
        case '2_0':
            chords = ["Dm", "E°", "F", "Gm", "Am", "Bb", "C"];
            break;

        case '2_1':
            chords = ["D", "Em", "F#m", "G", "A", "Bm", "C#°"];
            break;

        case '3_0':
            chords = ["D#m", "E#°", "F#", "G#m", "A#m", "B", "C#"];
            break;

        case '3_1':
            chords = ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°"];
            break;
            
        case '4_0':
            chords = ["Em", "F#°", "G", "Am", "Bm", "C", "D"];
            break;
            
        case '4_1':
            chords = ["E", "F#m", "G#m", "A", "B", "C#m", "D#°"];
            break;

        case '5_0':
            chords = ["Fm", "G°", "Ab", "Bbm", "Cm", "Db", "Eb"];
            break;

        case '5_1':
            chords = ["F", "Gm", "Am", "Bb", "C", "Dm", "E°"];
            break;

        case '6_0':
            chords = ["F#m", "G#°", "A", "Bm", "C#m", "D", "E"];
            break;

        case '6_1':
            chords = ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#°"];
            break;

        case '7_0':
            chords = ["Gm", "A°", "Bb", "Cm", "Dm", "Eb", "F"];
            break;
            
        case '7_1':
            chords = ["G", "Am", "Bm", "C", "D", "Em", "F#°"];
            break;
            
        case '8_0':
            chords = ["G#m", "A#°", "B", "C#m", "D#m", "E", "F#"];
            break;

        case '8_1':
            chords = ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "G°"];
            break;

        case '9_0':
            chords = ["Am", "B°", "C", "Dm", "Em", "F", "G"];
            break;
            
        case '9_1':
            chords = ["A", "Bm", "C#m", "D", "E", "F#m", "G#°"];
            break;
            
        case '10_0':
            chords = ["Bbm", "C°", "Db", "Ebm", "Fm", "Gb", "Ab"];
            break;
        
        case '10_1':
            chords = ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "A°"];
            break;
        
        case '11_0':
            chords = ["Bm", "C#°", "D", "Em", "F#m", "G", "A"];
            break;
            
        case '11_1':
            chords = ["B", "C#m", "D#m", "E", "F#", "G#m", "A#°"];
            break;
            
        default:
            chords = [];
            break;
    }

    return chords.filter(s => !s.includes('°'));
}

export function getDurationInMinAndSec(ms: number): string {

    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    return (
        sec === 60
            ? (min + 1) + ":00"
            : min + ":" + (sec < 10 ? "0" : "") + sec
    );
}