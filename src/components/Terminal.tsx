import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'CyberHub [Version 1.0.0]',
        '(c) 2024 Cyber Hub Corporation. All rights reserved.',
        '',
        "Type 'help' for a list of available commands.",
        ''
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    // Focus the input when the component mounts or the terminal is clicked
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Scroll to the bottom whenever the history changes
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (command: string): string => {
        const cmd = command.toLowerCase().trim();
        switch (cmd) {
            case 'help':
                return [
                    'Available commands:',
                    '- help: Show this help message',
                    '- dir: List files in current directory',
                    '- whoami: Display current user',
                    '- date: Display current date',
                    '- time: Display current time',
                    '- ver: Display Windows version',
                    '- about: About Cyber Hub',
                    '- cls: Clear the screen'
                ].join('\n');
            case 'dir':
                return [
                    'Directory of C:\\Users\\CyberHub',
                    '',
                    'drwxr-xr-x   .         ',
                    'drwxr-xr-x   ..        ',
                    'drwxr-xr-x   projects  ',
                    '-rw-r--r--   members.txt',
                    '-rw-r--r--   events.json',
                    '-rw-r--r--   mission.md ',
                ].join('\n');
            case 'whoami':
                return 'guest';
            case 'date':
                return new Date().toLocaleDateString();
            case 'time':
                return new Date().toLocaleTimeString();
            case 'ver':
                return 'CyberHub [Version 1.0.0]';
            case 'about':
                return 'Cyber Hub is not just a club; it\'s a launchpad. We are the architects of the future, the pioneers of the digital frontier.';
            case '':
                return '';
            default:
                return `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            const promptLine = `C:\\Users\\CyberHub> ${command}`;

            if (command) {
                setCommandHistory([command, ...commandHistory]);
            }
            setCommandHistoryIndex(-1);
            setInput('');

            if (command.toLowerCase() === 'cls') {
                setHistory([]);
                return;
            }

            const output = executeCommand(command);
            
            let newHistory = [...history, promptLine];
            if (output) {
                newHistory.push(output);
            }
            newHistory.push(''); // Add a blank line for spacing
            setHistory(newHistory);
            
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = Math.min(commandHistoryIndex + 1, commandHistory.length - 1);
                setCommandHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandHistoryIndex > -1) {
                const newIndex = Math.max(commandHistoryIndex - 1, -1);
                setCommandHistoryIndex(newIndex);
                setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
            }
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="bg-[#1E1E1E] rounded-lg shadow-2xl overflow-hidden cursor-text"
            style={{ boxShadow: '0 0 25px rgba(0, 255, 255, 0.2), 0 0 50px rgba(255, 0, 255, 0.1)' }}
            onClick={focusInput}
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
            <div 
                ref={terminalBodyRef}
                className="p-4 font-mono text-white text-sm whitespace-pre-wrap min-h-[250px] max-h-[400px] overflow-y-auto custom-scrollbar"
            >
                {history.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                <div className="flex items-center">
                    <span>C:\Users\CyberHub&gt;&nbsp;</span>
                    <span>{input}</span>
                    <span className="w-2 h-4 bg-white inline-block cursor"></span>
                </div>
                 {/* Hidden input to capture keyboard events */}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="absolute opacity-0 w-0 h-0 p-0 m-0 border-0"
                    autoFocus
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                />
            </div>
        </div>
    );
};

export default Terminal;
