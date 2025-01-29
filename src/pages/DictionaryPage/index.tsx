import { dictionaryData } from "@/data/dictionary";
import { Button, Card, CardContent, CardFooter, CardHeader, Heading, SignVideo, Tabs } from "@pin-code/uikit.lib";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useMemo } from "react";
import { MainRouter } from "@/router/routes/main";

export default function DictionaryPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const sign = useMemo(() => dictionaryData[id || "1"], [id]);
    const signText = `${sign!.text[0]!.toUpperCase()}${sign!.text!.slice(1)}`;

    const VideoComponent: FC<{ gif: string }> = ({ gif }) => (
        // @ts-ignore
        <SignVideo
            source={gif}
            className="w-full"
            ratio={672 / 492}
            extraButtons={
                sign!.recognitionText ? (
                    <Button variant={"default"} onClick={() => navigate(MainRouter.RecognitionPage(`${id}`))}>
                        Тренироваться
                    </Button>
                ) : (
                    <></>
                )
            }
        />
    );

    return (
        <Card className="h-fit flex-grow">
            <CardHeader>
                <Heading level={3}>{signText}</Heading>
            </CardHeader>
            <CardContent>
                {sign!.gifSource.length > 1 ? (
                    // @ts-ignore
                    <Tabs
                        className={"mt-0"}
                        // @ts-ignore
                        tabs={sign!.gifSource.map((gif, index) => ({
                            label: `${index + 1} вариант`,
                            children: <VideoComponent gif={gif} />,
                        }))}
                    />
                ) : (
                    <VideoComponent gif={sign!.gifSource[0]!} />
                )}
            </CardContent>

            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    * Произношение может не соответствовать выбранному слову для жестов, имеющих несколько значений.
                </p>
            </CardFooter>
        </Card>
    );
}
