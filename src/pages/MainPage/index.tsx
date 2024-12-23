import { Card, CardContent, CardFooter, CardHeader } from "ui/Card";
import { Heading } from "ui/Article/Heading";
import Main from "@/assets/images/Main.png";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainPage() {
    const isMobile = useIsMobile();

    return (
        <div className="flex-cols gap-8 flex-grow">
            <Card className="h-fit">
                <CardHeader>
                    <Heading level={3}>Словарь русского жестового языка</Heading>
                </CardHeader>
                <div className="flex gap-3 items-center justify-between">
                    <CardContent>
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Более 14 тысяч жестов</li>
                            <li>Тренируйтесь с ИИ моделью</li>
                            <li>Основан на базе видео жестов популярного сервиса</li>
                        </ul>
                    </CardContent>
                    {
                        !isMobile &&
                        <div className="pr-8">
                            <img src={Main} alt="Иллюстрация" width="280px"/>
                        </div>
                    }
                </div>
                <CardFooter>
                    <p className="text-xl text-muted-foreground w-full">
                        Выберите слово из словаря, чтобы<br/>
                        посмотреть видео с жестом
                    </p>
                </CardFooter>
            </Card>
        </div>

    )
}
