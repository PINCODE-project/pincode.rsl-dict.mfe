import { useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import { Input } from 'ui/Input';
import { Button } from 'ui/Button';
import { ScrollArea } from 'ui/ScrollArea';
import { Sheet, SheetContent } from 'ui/Sheet';
import { Card } from 'ui/Card';
import { dictionaryData, Sign } from '@/data/dictionary';
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import Fuse from 'fuse.js'; // Импортируем библиотеку fuse.js

interface SidebarProps {
    onSelectWord: (word: Sign) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ onSelectWord, isOpen, onClose }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
    const numbers = '0123456789'.split('');
    const parentRef = useRef<HTMLDivElement>(null);

    const debouncedSetSearchTerm = useDebouncedCallback(
        (value: string) => setSearchTerm(value),
        300
    );


    const filteredWords = useMemo(() => {
        const words: { id: string; text: string; entry: Sign }[] = [];

        Object.values(dictionaryData).forEach((entry) => {
            entry.text.split(';').forEach((word, index) => {
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
            keys: ['text'],
            includeScore: true,
            threshold: 0.3,
        });
    }, [filteredWords]);

    const filteredAndSearchWords = useMemo(() => {
        if (searchTerm === '') {
            return filteredWords;
        }
        return fuse.search(searchTerm).map(result => result.item);
    }, [searchTerm, fuse, filteredWords]);

    const virtualizer = useVirtualizer({
        count: filteredAndSearchWords.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        measureElement: (el) => el?.getBoundingClientRect().height || 40,
        overscan: 5,
    });

    useEffect(() => {
        if (searchTerm && virtualizer.getVirtualItems()[0]?.index !== 0) {
            virtualizer.scrollToIndex(0);
        }
    }, [searchTerm, virtualizer]);

    const sidebarKey = isOpen ? 'open' : 'closed';

    const sidebarContent = (
        <div className="h-full flex flex-col p-2 gap-4">
            <Input
                type="search"
                placeholder="Поиск..."
                onChange={(e) => debouncedSetSearchTerm(e.target.value)}
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
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualRow) => {
                            const word = filteredAndSearchWords[virtualRow.index];
                            return (
                                <div
                                    key={word!.id}
                                    ref={(el) => {
                                        if (el) virtualizer.measureElement(el)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                    data-index={virtualRow.index}
                                >
                                    <Button
                                        variant="ghost"
                                        className="justify-start w-full h-auto text-wrap"
                                        onClick={() => {
                                            onSelectWord(word!.entry);
                                            onClose();
                                        }}
                                        style={{textAlign: "start"}}
                                    >
                                        {word!.text}
                                    </Button>
                                </div>
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
            <Card key={sidebarKey} className="hidden md:block h-full bg-card border-r p-4 w-[300px]">
                {sidebarContent}
            </Card>
            <Sheet open={isOpen} onOpenChange={onClose}>
                {/*@ts-ignore*/}
                <SheetContent key={sidebarKey} side="left" className="w-[300px] sm:w-[400px]">
                    {sidebarContent}
                </SheetContent>
            </Sheet>
        </>
    );
}
