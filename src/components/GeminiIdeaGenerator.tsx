import React, { useState, useRef, useEffect } from 'react';
import { generateIdea } from '../services/geminiService';
import { IDEA_TOPICS } from '../constants';
import { SparklesIcon } from './Icons';

const GeminiIdeaGenerator: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
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
    }, []);
    
    const handleGenerate = async (prompt: string) => {
        setLoading(true);
        setError('');
        setIdea('');
        const result = await generateIdea(prompt);
        if (result.startsWith('An error occurred:')) {
            setError(result);
        } else {
            setIdea(result);
        }
        setLoading(false);
    };

    return (
        <div 
            ref={ref}
            className={`card-bg p-8 rounded-lg max-w-4xl mx-auto text-center scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">Stuck on a project?</h3>
            <p className="text-gray-300 mb-6">Let our AI forge an idea for you. Pick a category to start.</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {IDEA_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                        <button 
                            key={topic.name}
                            onClick={() => handleGenerate(topic.prompt)}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gray-700 text-white font-bold py-2 px-5 rounded-full hover:bg-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <Icon className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
                            {topic.name}
                        </button>
                    );
                })}
            </div>

            {loading && (
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-8 h-8 border-4 rounded-full border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" role="status">
                    </div>
                    <span className="text-gray-300">Forging an idea...</span>
                </div>
            )}
            
            {error && (
                <div className="mt-4 p-4 bg-red-900/50 text-red-300 border border-red-500 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            {idea && (
                <div className="mt-4 p-6 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-left">
                    <p className="text-lg text-cyan-200">{idea}</p>
                </div>
            )}
        </div>
    );
}

export default GeminiIdeaGenerator;