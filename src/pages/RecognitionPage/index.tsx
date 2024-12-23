import { SignRecognitionBlock } from 'ui/SignRecognitionBlock'
import { dictionaryData } from '@/data/dictionary'
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export default function RecognitionPage() {
    const { id } = useParams();
    const sign = useMemo(() => dictionaryData[id || "1"], [id])
    const signText = `${sign!.text[0]!.toUpperCase()}${sign!.text!.slice(1)}`

    return (
        <SignRecognitionBlock word={signText} className="h-fit m-0 flex-grow"/>
    )
}

