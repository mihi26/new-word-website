import {useEffect, useState} from "react"
import {VolumeUp} from "../icons/VolumeUp"
import {PauseIcon} from "../icons/PauseIcon";
import {ResumeIcon} from "../icons/ResumeIcon";
// import Button from "./Button"

const TextToSpeech = (props) => {
    const {
        text,
        setVoicesForHomePage
    } = props
    const [isPause, setIsPause] = useState(false)
    const [voices, setVoices] = useState<any>([])
    const [vnVoice, setVnVoice] = useState<any>('')
    const [enVoice, setEnVoice] = useState<any>('')
    useEffect(() => {
        const synth = window.speechSynthesis
        setVoices(synth.getVoices())
        const en = synth.getVoices().find(data => data.lang === 'en-US')
        const vn = synth.getVoices().find(data => data.lang === 'vi-VN')
        setEnVoice(en?.name ? en?.name : '')
        setVnVoice(vn?.name ? vn?.name : '')
        return () => {
            synth.cancel()
        }
    }, [text])
    useEffect(() => {
        if (enVoice && vnVoice) {
            setVoicesForHomePage(enVoice, vnVoice)
        }
    }, [vnVoice, enVoice, setVoicesForHomePage])

    const handlePlay = () => {
        const synth = window.speechSynthesis
        synth.cancel()
        text.map(data => {
            const u = new SpeechSynthesisUtterance(data.text)
            u.voice = voices.find(voice => {
                return voice.name === (data.key === 'en-US' ? enVoice : vnVoice)
            })!
            u.rate = 0.8
            synth.speak(u)
        })
    }

    const handlePause = () => {
        setIsPause(true)
        const synth = window.speechSynthesis
        synth.pause()
    }

    const handleResume = () => {
        setIsPause(false)
        const synth = window.speechSynthesis
        synth.resume()
    }

    return (
        <div className="flex gap-4 items-center">
            <div className="w-full">EN Voice:</div>
            <select
                className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                onChange={(e) => setEnVoice(e.target.value)}
            >
                {voices.filter(voice => voice.lang === 'en-US').map((data, index) => {
                    return <option key={data.name} value={data.name}>{data.lang + (index + 1)}</option>
                })}
            </select>
            <div className="w-full">VN Voice:</div>
            <select
                className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                onChange={(e) => setVnVoice(e.target.value)}
            >
                {voices.filter(voice => voice.lang === 'vi-VN').map((data, index) => {
                    return <option key={data.name} value={data.name}>{data.lang + (index + 1)}</option>
                })}
            </select>
            <div className="flex gap-3 items-center cursor-pointer w-fit hover:bg-slate-100 rounded p-2"
                 onClick={handlePlay}>
                <div className="bg-[#066cfa] w-min rounded-3xl p-2">
                    <VolumeUp width={24} height={24} color="white"/>
                </div>
                <div className="text-[#066cfa]">Play</div>
            </div>
            <div className="flex gap-3 items-center cursor-pointer w-fit hover:bg-slate-100 rounded p-2"
                 onClick={() => isPause ? handleResume() : handlePause()}>
                <div className="bg-[#066cfa] w-min rounded-3xl p-2">
                    {!isPause ? <PauseIcon width={24} height={24} color="white"/> :
                        <ResumeIcon width={24} height={24} color="white"/>}
                </div>
                <div className="text-[#066cfa]">{!isPause ? 'Pause' : 'Resume'}</div>
            </div>
        </div>
    )
}

export default TextToSpeech
