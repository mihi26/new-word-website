import {useEffect, useState} from "react"
import {RepeatIcon} from "../icons/RepeatIcon"
import {VolumeUp} from "../icons/VolumeUp"
// import Button from "./Button"

const TextToSpeech = ({text}) => {
    const [isRepeat, setIsRepeat] = useState(false)
    const [isPause] = useState(true)
    const [utterance] = useState<any>(null)
    const [voices, setVoices] = useState<any>([])

    useEffect(() => {
        const synth = window.speechSynthesis
        setVoices(synth.getVoices())
        return () => {
            synth.cancel()
        }
    }, [text])

    const handlePlay = () => {
        if (isPause) {
            const synth = window.speechSynthesis
            text.map(data => {
                const u = new SpeechSynthesisUtterance(data.text)
                u.voice = voices.find(voice => voice.lang === data.key)!
                synth.speak(u)
            })
        }
    }

    const handleRepeat = () => {
        if (isRepeat) {
            setIsRepeat(false)
        } else {
            setIsRepeat(true)
            utterance.onend = function () {
                handlePlay()
            }
            handlePlay()
        }
    }

    return (
        <div className="flex gap-4 items-center">
            <div className="flex gap-3 items-center cursor-pointer w-fit hover:bg-slate-100 rounded p-2"
                 onClick={handlePlay}>
                <div className="bg-[#066cfa] w-min rounded-3xl p-2">
                    <VolumeUp width={24} height={24} color="white"/>
                </div>
                <div className="text-[#066cfa]">Play</div>
            </div>
            <div className="flex gap-3 items-center cursor-pointer w-fit hover:bg-slate-100 rounded p-2"
                 onClick={handleRepeat}>
                <div className="bg-[#066cfa] w-min rounded-3xl p-2">
                    <RepeatIcon width={24} height={24} color="white"/>
                </div>
                <div className="text-[#066cfa]">Repeat</div>
            </div>
        </div>
    )
}

export default TextToSpeech
