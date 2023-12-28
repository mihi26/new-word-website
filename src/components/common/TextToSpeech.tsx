import { useState, useEffect } from "react"
import { RepeatIcon } from "../icons/RepeatIcon"
import { VolumeUp } from "../icons/VolumeUp"
import Button from "./Button"

const TextToSpeech = ({ text }) => {
  const [isRepeat, setIsRepeat] = useState(false)
  const [utterance, setUtterance] = useState(null)

  useEffect(() => {
    const synth = window.speechSynthesis
    const u = new SpeechSynthesisUtterance(text)

    setUtterance(u)

    return () => {
      synth.cancel()
    }
  }, [text])

  const handlePlay = () => {
    const synth = window.speechSynthesis

    synth.speak(utterance)
  }

  const handleRepeat = () => {
    const synth = window.speechSynthesis
    if (isRepeat) {
      setIsRepeat(false)
      synth.cancel()
    } else {
      setIsRepeat(true)
      utterance.onend = function () {
        synth.speak(utterance)
      }
      synth.speak(utterance)
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="h-[32px]">
        <Button
          icon={<VolumeUp width={32} height={32} color="#00578A" />}
          label=""
          onClick={handlePlay}
          backgroundColor="transparent"
          borderColor="transparent"
        ></Button>
      </div>
      <div className="w-[32px] h-[32px]">
        <Button
          icon={<RepeatIcon width={24} height={24} color="#00578A" />}
          label=""
          onClick={handleRepeat}
          backgroundColor="transparent"
          borderColor={isRepeat ? "border-blue" : "transparent"}
        ></Button>
      </div>
    </div>
  )
}

export default TextToSpeech
