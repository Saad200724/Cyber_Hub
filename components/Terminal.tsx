import React, { useState, useEffect, useRef } from 'react';

const TERMINAL_LINES = [
    { text: 'CyberHub [Version 1.0.0]', hasPrompt: false },
    { text: '(c) 2024 Cyber Hub Corporation. All rights reserved.', hasPrompt: false },
    { text: '', hasPrompt: false },
    { text: 'init --club-mission', hasPrompt: true },
    { text: 'Initializing core protocols...', hasPrompt: false, delay: 200 },
    { text: 'Mission: To dismantle the present and build a better tomorrow.', hasPrompt: false, delay: 500 },
    { text: 'Status: Ready.', hasPrompt: false, delay: 100 },
    { text: '', hasPrompt: true, final: true }
];

const Terminal: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isVisible) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let currentLineIndex = 0;
        let currentCharIndex = 0;
        // Fix: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout.
        let currentTimeout: ReturnType<typeof setTimeout>;

        const type = () => {
            if (currentLineIndex >= TERMINAL_LINES.length) return;
            
            const lineConfig = TERMINAL_LINES[currentLineIndex];
            const fullLine = (lineConfig.hasPrompt ? 'C:\\Users\\CyberHub> ' : '') + lineConfig.text;
            
            if (currentCharIndex < fullLine.length) {
                setLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = fullLine.substring(0, currentCharIndex + 1);
                    return newLines;
                });
                currentCharIndex++;
                currentTimeout = setTimeout(type, 20);
            } else {
                currentLineIndex++;
                currentCharIndex = 0;
                if (currentLineIndex < TERMINAL_LINES.length) {
                     setLines(prev => {
                        const newLines = [...prev];
                        const nextLineConf = TERMINAL_LINES[currentLineIndex];
                        newLines[currentLineIndex] = nextLineConf.hasPrompt ? 'C:\\Users\\CyberHub> ' : '';
                        return newLines;
                    });
                    const nextLineDelay = TERMINAL_LINES[currentLineIndex].delay || 100;
                    currentTimeout = setTimeout(type, nextLineDelay);
                }
            }
        };

        setLines(['']);
        type();

        return () => clearTimeout(currentTimeout);
    }, [isVisible]);

    const showCursor = (lineIndex: number) => {
        if (!lines[lineIndex]) return false;
        const lineConfig = TERMINAL_LINES[lineIndex];
        const fullText = (lineConfig.hasPrompt ? 'C:\\Users\\CyberHub> ' : '') + lineConfig.text;
        return lines[lineIndex].length === fullText.length;
    };
    
    return (
        <div 
            ref={ref} 
            className={`bg-[#1E1E1E] rounded-lg shadow-2xl overflow-hidden scroll-animate ${isVisible ? 'is-visible' : ''}`}
            style={{boxShadow: '0 0 25px rgba(0, 255, 255, 0.2), 0 0 50px rgba(255, 0, 255, 0.1)'}}
        >
            <div className="bg-[#333] px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-gray-400 text-sm font-sans">
                    CyberHub Terminal
                </div>
            </div>
            <div className="p-4 font-mono text-white text-sm whitespace-pre-wrap min-h-[250px]">
                {lines.map((line, index) => (
                    <div key={index}>
                        <span>{line}</span>
                        {showCursor(index) && TERMINAL_LINES[index].final && <span className="w-2 h-4 bg-white inline-block cursor"></span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Terminal;
