import * as Tone from "tone"

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination()

synth.volume.value = -17

const reverb = new Tone.Reverb({
    decay: 20,
    wet: 1.0
}).toDestination()

synth.chain(reverb)

const autoWah = new Tone.AutoWah(50, 6, -30).toDestination()
autoWah.Q.value = 6

synth.chain(autoWah)

//play a middle 'C' for the duration of an 8th note


// TODO: Add scale
//  (A, C, D, E, G, A in A minor) 
const scale = ['A4', 'C4', 'D4', 'E4', 'G4', 'A5']

const chords = [
    ['A4', 'C4', 'E4'],
    ['C4', 'E4', 'G4'],
    ['D4', 'F4', 'A4'],
    ['E4', 'G4', 'B4'],
    ['G4', 'B4', 'D4'],
    ['A5', 'C5', 'E5']
]

export const getRandomChord = () => {
    return chords[Math.floor(Math.random() * chords.length)]
}

export const playScale = () => {

}

export const playNote = (note: string) => {
    synth.triggerAttackRelease(note, "8n")
}

export const playChord = (chord: string[]) => {
    synth.triggerAttackRelease(chord, "8n")
}