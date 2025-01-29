import { Card, CardContent, CardHeader, Heading, SignVideo } from "@pin-code/uikit.lib";
import styles from "./styles.module.scss";

const NewYearPage = () => {
    return (
        <>
            <Card className="max-w-2xl m-auto">
                <CardHeader>
                    <Heading level={3}>Дорогие друзья!</Heading>
                </CardHeader>
                <CardContent>
                    От лица всей нашей команды мы рады поздравить вас с наступающим Новым годом! Пусть этот год принесет
                    вам радость, тепло и вдохновение для новых свершений.
                    {/* @ts-ignore*/}
                    <SignVideo
                        source="https://storage.yandexcloud.net/signs-signs/new-year.mp4"
                        className="m-auto max-w-xl mt-5"
                        ratio={952 / 720}
                    />
                </CardContent>
            </Card>
            <div className={styles.pyro}>
                <div className={styles.before}></div>
                <div className={styles.after}></div>
            </div>
        </>
    );
};

export default NewYearPage;
