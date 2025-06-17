import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { dictionaryData } from "@/data/dictionary";
import { Button, Card, CardContent, CardFooter, CardHeader, Heading, SignVideo, Tabs, TabsContent, TabsList, TabsTrigger, } from "@pin-code/uikit.lib";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { MainRouter } from "@/router/routes/main";
export default function DictionaryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const sign = useMemo(() => dictionaryData[id || "1"], [id]);
    const signText = `${sign.text[0].toUpperCase()}${sign.text.slice(1)}`;
    const VideoComponent = ({ gif }) => (
    // @ts-ignore
    _jsx(SignVideo, { source: gif, className: "w-full", ratio: 672 / 492, extraButtons: sign.recognitionText ? (_jsx(Button, { variant: "default", onClick: () => navigate(MainRouter.RecognitionPage(`${id}`)), children: "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })) : (_jsx(_Fragment, {})) }));
    return (_jsxs(Card, { className: "h-fit flex-grow", children: [_jsx(CardHeader, { children: _jsx(Heading, { level: 3, children: signText }) }), _jsx(CardContent, { children: sign.gifSource.length > 1 ? (_jsxs(Tabs, { defaultValue: "0", children: [_jsx(TabsList, { className: "flex justify-start w-fit flex-wrap h-fit", children: sign.gifSource.map((gif, index) => (_jsxs(TabsTrigger, { value: `${index}`, children: [index + 1, " \u0432\u0430\u0440\u0438\u0430\u043D\u0442"] }, `${gif}${index}`))) }), sign.gifSource.map((gif, index) => (_jsx(TabsContent, { value: `${index}`, children: _jsx(VideoComponent, { gif: gif }) }, `${gif}${index}`)))] })) : (_jsx(VideoComponent, { gif: sign.gifSource[0] })) }), _jsx(CardFooter, { children: _jsx("p", { className: "text-sm text-muted-foreground", children: "* \u041F\u0440\u043E\u0438\u0437\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u043C\u043E\u0436\u0435\u0442 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C\u0443 \u0441\u043B\u043E\u0432\u0443 \u0434\u043B\u044F \u0436\u0435\u0441\u0442\u043E\u0432, \u0438\u043C\u0435\u044E\u0449\u0438\u0445 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439." }) })] }));
}
