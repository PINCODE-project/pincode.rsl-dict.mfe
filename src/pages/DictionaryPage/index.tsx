import { dictionaryData } from '@/data/dictionary'
import SignVideo from "ui/SignVideo";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "ui/Card";
import { Heading } from "ui/Article/Heading";
import { Tabs } from "ui/Article/Tabs";
import { Button } from "ui/Button";
import { MainRouter } from "@/router/routes/main";

export default function DictionaryPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const sign = useMemo(() => dictionaryData[id || "1"], [id])
    const signText = `${sign!.text[0]!.toUpperCase()}${sign!.text!.slice(1)}`

    const Video: FC<{gif: string}> = ({ gif }) => (
        <SignVideo source={gif} className="w-full" ratio={672 / 492} extraButtons={sign!.recognitionText ? (
            <Button variant={'default'} onClick={() => navigate(MainRouter.RecognitionPage(`${id}`))}>
                Тренироваться
            </Button>
        ) : <></>}/>
    )

    return (
        <Card className="h-fit flex-grow">
            <CardHeader>
                <Heading level={3}>{signText}</Heading>
            </CardHeader>
            <CardContent>
                {
                    sign!.gifSource.length > 1 ?
                        <Tabs className={"mt-0"} tabs={sign!.gifSource.map((gif, index) => ({
                            label: `${index + 1} вариант`,
                            children: <Video gif={gif}/>
                        }))}/>
                        : <Video gif={sign!.gifSource[0]!}/>
                }
            </CardContent>

            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    * Артикуляция на видео может не соответствовать жесту для слов, имеющих несколько значений.
                </p>
            </CardFooter>
        </Card>
    )
}

