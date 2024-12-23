import { Card, CardContent, CardHeader } from "ui/Card";
import { Heading } from "ui/Article/Heading";

const AboutPage = () => {
    return (
        <Card className="max-w-2xl m-auto">
            <CardHeader>
                <Heading level={3}>О нас</Heading>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-lg">
                    Словарь русского жестового языка (РЖЯ) — это некоммерческий проект, разработанный студенческой
                    командой Пин-код в ответ на блокировку популярного сайта <i>spreadthesign</i> на территории России.
                    Мы уверены, что такие ресурсы должны быть доступны каждому.
                </p>

                <p className="text-lg">
                    Наш сервис ориентирован на глухих и слабослышащих людей, использующих русский жестовый язык для общения,
                    а также на всех, кто хочет научиться этому языку. Здесь вы можете подробно изучать жесты, рассматривая их детально.
                </p>

                <p className="text-lg">
                    В нашем сервисе доступен режим тренировки для некоторых жестов. В нём необходимо показать жест в камеру,
                    и <a href="https://github.com/ai-forever/easy_sign" className="underline">модель</a> распознает, какой жест вы продемонстрировали.
                </p>
            </CardContent>

        </Card>
    )
}

export default AboutPage;