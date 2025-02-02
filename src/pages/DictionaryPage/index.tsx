import { dictionaryData } from "@/data/dictionary";
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Heading,
    SignVideo,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@pin-code/uikit.lib";
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
                    <Tabs defaultValue="0">
                        <TabsList className="grid w-full grid-cols-2">
                            {sign!.gifSource.map((gif, index) => (
                                <TabsTrigger key={`${gif}${index}`} value={`${index}`}>
                                    {index + 1} вариант
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {sign!.gifSource.map((gif, index) => (
                            <TabsContent key={`${gif}${index}`} value={`${index}`}>
                                <VideoComponent gif={gif} />
                            </TabsContent>
                        ))}
                    </Tabs>
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
