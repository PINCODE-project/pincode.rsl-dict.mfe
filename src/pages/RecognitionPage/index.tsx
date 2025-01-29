import { SignRecognitionBlock } from '@pin-code/uikit.lib'
import { dictionaryData } from '@/data/dictionary'
import { Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { MainRouter } from "@/router/routes/main";

export default function RecognitionPage() {
    const { id } = useParams();
    const sign = useMemo(() => dictionaryData[id || "1"], [id])

    if(!sign || !sign.recognitionText)
        return <Navigate to={MainRouter.MainPage}/>

    const signText = `${sign!.text[0]!.toUpperCase()}${sign!.text!.slice(1)}`

    return (
        <SignRecognitionBlock word={signText} className="h-fit m-0 flex-grow" recognitionText={sign!.recognitionText!} />
    )
}

