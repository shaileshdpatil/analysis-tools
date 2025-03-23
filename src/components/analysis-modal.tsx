import { X, AlertCircle, BarChart, BookOpen, Clock, FileText } from 'lucide-react';
import { useState } from 'react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export function AnalysisModal({ isOpen, onClose, content }: AnalysisModalProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'visualizations' | 'summary'>('metrics');
  
  if (!isOpen) return null;

  const metrics = [
    {
      title: 'Word Count',
      value: content.trim().split(/\s+/).filter(Boolean).length,
      description: 'Total number of words in the content',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Character Count',
      value: content.length,
      description: 'Total number of characters (including spaces)',
      icon: BookOpen,
      color: 'text-indigo-600'
    },
    {
      title: 'Sentence Count',
      value: content.split(/[.!?]+/).filter(Boolean).length,
      description: 'Approximate number of sentences',
      icon: AlertCircle,
      color: 'text-purple-600'
    },
    {
      title: 'Paragraph Count',
      value: content.split('\n\n').filter(Boolean).length,
      description: 'Number of paragraphs (separated by blank lines)',
      icon: BarChart,
      color: 'text-green-600'
    },
    {
      title: 'Reading Time',
      value: Math.max(1, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 225)),
      description: 'Estimated time to read in minutes (at 225 words per minute)',
      icon: Clock,
      color: 'text-amber-600'
    }
  ];

  // Calculate word frequency for visualization
  const wordFrequency = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3) // Only count words longer than 3 characters
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Sort words by frequency
  const topWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate max frequency for normalization
  const maxFrequency = topWords.length > 0 ? topWords[0][1] : 0;

  // Function to get summary 
  const getSummary = () => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const characterCount = content.length;
    const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length;
    
    const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : '0';
    const avgCharsPerWord = wordCount > 0 ? (characterCount / wordCount).toFixed(1) : '0';
    
    let complexity = 'Simple';
    if (Number(avgWordsPerSentence) > 15) {
      complexity = 'Complex';
    } else if (Number(avgWordsPerSentence) > 10) {
      complexity = 'Moderate';
    }
    
    return {
      avgWordsPerSentence,
      avgCharsPerWord,
      complexity
    };
  };
  
  const summary = getSummary();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Content Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'metrics' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'visualizations' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('visualizations')}
          >
            Visualizations
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'summary' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="px-5 py-4">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${metric.color.replace('text-', 'bg-').replace('600', '100')}`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{metric.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'visualizations' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Common Words</h3>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                {topWords.length > 0 ? (
                  <div className="space-y-4">
                    {topWords.map(([word, frequency]) => (
                      <div key={word} className="flex items-center">
                        <div className="w-24 font-medium text-gray-700 capitalize">{word}</div>
                        <div className="flex-1 mx-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" 
                              style={{ width: `${(frequency / maxFrequency) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-gray-500 text-sm text-right">{frequency}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Not enough content for word frequency analysis</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'summary' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Summary</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Average Words Per Sentence</p>
                    <p className="text-2xl font-bold text-indigo-700">{summary.avgWordsPerSentence}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Average Characters Per Word</p>
                    <p className="text-2xl font-bold text-purple-700">{summary.avgCharsPerWord}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Text Complexity</p>
                    <p className="text-2xl font-bold text-blue-700">{summary.complexity}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Content Preview</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{content.slice(0, 300)}{content.length > 300 ? '...' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
          <p className="text-xs text-gray-500">Analysis generated {new Date().toLocaleString()}</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}