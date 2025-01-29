import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { Button, Card, Input, ScrollArea, Sheet, SheetContent } from "@pin-code/uikit.lib";
import { dictionaryData, Sign } from "@/data/dictionary";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import Fuse from "fuse.js";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { setIsOpenSidebar } from "@/store/sidebar";

interface SidebarProps {
    onSelectWord: (word: Sign) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ onSelectWord, isOpen, onClose }: SidebarProps) {
    const isMobile = useIsMobile();
    const [searchTerm, setSearchTerm] = useState("");
    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
    const numbers = "0123456789".split("");
    const parentRef = useRef<HTMLDivElement>(null);

    const debouncedSetSearchTerm = useDebouncedCallback((value: string) => setSearchTerm(value), 0);

    const filteredWords = useMemo(() => {
        const words: { id: string; text: string; entry: Sign }[] = [];

        Object.values(dictionaryData).forEach((entry) => {
            entry.text.split(";").forEach((word, index) => {
                if (word.toLowerCase().includes(searchTerm.toLowerCase())) {
                    const trimmedWord = word.trim();
                    words.push({
                        id: `${entry.id}-${index}`,
                        text: `${trimmedWord[0]!.toUpperCase()}${trimmedWord.slice(1)}`,
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
                      text: entry.text.split(";")[0]!.trim(),
                      entry,
                  }));
        }
        return fuse.search(searchTerm).map((result) => result.item);
    }, [searchTerm, fuse, filteredWords]);

    const virtualizer = useVirtualizer({
        count: filteredAndSearchWords.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        measureElement: (el) => el?.getBoundingClientRect().height || 40,
        overscan: 20,
    });

    useEffect(() => {
        if (searchTerm && virtualizer.getVirtualItems()[0]?.index !== 0) {
            virtualizer.scrollToIndex(0);
        }
    }, [searchTerm, virtualizer]);

    useEffect(() => {
        virtualizer.measure();
    }, [isOpen]);

    const sidebarKey = isOpen ? "open" : "closed";

    const VirtualRow = memo(({ word, virtualRow, onSelectWord, onClose }: any) => (
        <div
            ref={(el) => {
                if (el) {
                    virtualizer.measureElement(el);
                }
            }}
            key={word.id}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
            }}
            data-index={virtualRow.index}
        >
            <Button
                variant="ghost"
                className="justify-start w-full h-auto text-wrap"
                onClick={() => {
                    onSelectWord(word.entry);
                    onClose();
                }}
                style={{ textAlign: "start" }}
            >
                {word.text}
            </Button>
        </div>
    ));

    const sidebarContent = (
        <div className="h-full flex flex-col p-2 gap-4">
            <Input
                type="search"
                placeholder="Поиск..."
                onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                value={searchTerm}
                className="mb-4"
            />
            <div className="flex-1 flex overflow-hidden">
                <div
                    ref={parentRef}
                    className={cn("flex-1 pr-4 h-full overflow-y-auto overflow-x-hidden", styles.scroll)}
                >
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualRow) => {
                            const word = filteredAndSearchWords[virtualRow.index];
                            return (
                                <VirtualRow
                                    key={word!.id}
                                    word={word!}
                                    virtualRow={virtualRow}
                                    onSelectWord={onSelectWord}
                                    onClose={onClose}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="w-8">
                    <ScrollArea className="h-full">
                        {alphabet.map((letter) => (
                            <Button
                                key={letter}
                                variant="ghost"
                                size="sm"
                                className="w-full mb-1"
                                onClick={() => debouncedSetSearchTerm(letter)}
                            >
                                {letter}
                            </Button>
                        ))}
                        {numbers.map((number) => (
                            <Button
                                key={number}
                                variant="ghost"
                                size="sm"
                                className="w-full mb-1"
                                onClick={() => debouncedSetSearchTerm(number)}
                            >
                                {number}
                            </Button>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {!isMobile && (
                <Card key={sidebarKey} className="h-full bg-card border-r p-4 w-[300px]">
                    {sidebarContent}
                </Card>
            )}
            {isMobile && (
                <Sheet open={isOpen} onOpenChange={onClose}>
                    {/*@ts-ignore*/}
                    <SheetContent key={sidebarKey} side="left" className="w-[300px] sm:w-[400px]">
                        <div className="mt-4 mb-5 flex flex-col gap-4">
                            <Button variant="outline" asChild onClick={() => setIsOpenSidebar(false)}>
                                <Link to="/about">О нас</Link>
                            </Button>
                            {/*<Link to="/new-year">*/}
                            {/*    <Button variant="destructive" effect="shineHover" className="w-full"*/}
                            {/*            onClick={() => setIsOpenSidebar(false)}>*/}
                            {/*        <Snowflake className="mr-2 h-5 w-5"/>*/}
                            {/*        С новым годом!*/}
                            {/*    </Button>*/}
                            {/*</Link>*/}
                        </div>
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
}
