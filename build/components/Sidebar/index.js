import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { Button, Card, Input, ScrollArea, Sheet, SheetContent } from "@pin-code/uikit.lib";
import { dictionaryData } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import Fuse from "fuse.js";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { setIsOpenSidebar } from "@/store/sidebar";
export function Sidebar({ onSelectWord, isOpen, onClose }) {
    const isMobile = useIsMobile();
    const [searchTerm, setSearchTerm] = useState("");
    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
    const numbers = "0123456789".split("");
    const parentRef = useRef(null);
    const debouncedSetSearchTerm = useDebouncedCallback((value) => setSearchTerm(value), 0);
    const filteredWords = useMemo(() => {
        const words = [];
        Object.values(dictionaryData).forEach((entry) => {
            entry.text.split(";").forEach((word, index) => {
                if (word.toLowerCase().includes(searchTerm.toLowerCase())) {
                    const trimmedWord = word.trim();
                    words.push({
                        id: `${entry.id}-${index}`,
                        text: `${trimmedWord[0].toUpperCase()}${trimmedWord.slice(1)}`,
                        entry,
                    });
                }
            });
        });
        return words.sort((a, b) => a.text.localeCompare(b.text));
    }, [searchTerm]);
    const fuse = useMemo(() => {
        return new Fuse(filteredWords, {
            keys: ["text"],
            includeScore: true,
            threshold: 0.3,
        });
    }, [filteredWords]);
    const filteredAndSearchWords = useMemo(() => {
        if (searchTerm === "") {
            return filteredWords.length
                ? filteredWords
                : Object.values(dictionaryData).map((entry) => ({
                    id: entry.id,
                    text: entry.text.split(";")[0].trim(),
                    entry,
                }));
        }
        return fuse.search(searchTerm).map((result) => result.item);
    }, [searchTerm, fuse, filteredWords]);
    const virtualizer = useVirtualizer({
        count: filteredAndSearchWords.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        measureElement: (el) => (el === null || el === void 0 ? void 0 : el.getBoundingClientRect().height) || 40,
        overscan: 20,
    });
    useEffect(() => {
        var _a;
        if (searchTerm && ((_a = virtualizer.getVirtualItems()[0]) === null || _a === void 0 ? void 0 : _a.index) !== 0) {
            virtualizer.scrollToIndex(0);
        }
    }, [searchTerm, virtualizer]);
    useEffect(() => {
        virtualizer.measure();
    }, [isOpen]);
    const sidebarKey = isOpen ? "open" : "closed";
    const VirtualRow = memo(({ word, virtualRow, onSelectWord, onClose }) => (_jsx("div", { ref: (el) => {
            if (el) {
                virtualizer.measureElement(el);
            }
        }, style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualRow.start}px)`,
        }, "data-index": virtualRow.index, children: _jsx(Button, { variant: "ghost", className: "justify-start w-full h-auto text-wrap", onClick: () => {
                onSelectWord(word.entry);
                onClose();
            }, style: { textAlign: "start" }, children: word.text }) }, word.id)));
    const sidebarContent = (_jsxs("div", { className: "h-full flex flex-col p-2 gap-4", children: [_jsx(Input, { type: "search", placeholder: "\u041F\u043E\u0438\u0441\u043A...", onChange: (e) => debouncedSetSearchTerm(e.target.value), value: searchTerm, className: "mb-4" }), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [_jsx("div", { ref: parentRef, className: cn("flex-1 pr-4 h-full overflow-y-auto overflow-x-hidden", styles.scroll), children: _jsx("div", { style: {
                                height: `${virtualizer.getTotalSize()}px`,
                                width: "100%",
                                position: "relative",
                            }, children: virtualizer.getVirtualItems().map((virtualRow) => {
                                const word = filteredAndSearchWords[virtualRow.index];
                                return (_jsx(VirtualRow, { word: word, virtualRow: virtualRow, onSelectWord: onSelectWord, onClose: onClose }, word.id));
                            }) }) }), _jsx("div", { className: "w-8", children: _jsxs(ScrollArea, { className: "h-full", children: [alphabet.map((letter) => (_jsx(Button, { variant: "ghost", size: "sm", className: "w-full mb-1", onClick: () => debouncedSetSearchTerm(letter), children: letter }, letter))), numbers.map((number) => (_jsx(Button, { variant: "ghost", size: "sm", className: "w-full mb-1", onClick: () => debouncedSetSearchTerm(number), children: number }, number)))] }) })] })] }));
    return (_jsxs(_Fragment, { children: [!isMobile && (_jsx(Card, { className: "h-full bg-card border-r p-4 w-[300px]", children: sidebarContent }, sidebarKey)), isMobile && (_jsx(Sheet, { open: isOpen, onOpenChange: onClose, children: _jsxs(SheetContent, { side: "left", className: "w-[300px] sm:w-[400px]", children: [_jsx("div", { className: "mt-4 mb-5 flex flex-col gap-4", children: _jsx(Button, { variant: "outline", asChild: true, onClick: () => setIsOpenSidebar(false), children: _jsx(Link, { to: "/about", children: "\u041E \u043D\u0430\u0441" }) }) }), sidebarContent] }, sidebarKey) }))] }));
}
