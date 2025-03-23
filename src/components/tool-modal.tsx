import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
  basicTools, 
  advancedTools, 
  visualizationTools, 
  sentimentTools,
  Tool
} from '../data/tools';

interface ToolModalProps {
  toolId: string;
  content: string;
  onBack: () => void;
  category: 'basic' | 'advanced' | 'visualization' | 'sentiment';
}

export function ToolModal({ toolId, content, onBack, category }: ToolModalProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [processingStarted, setProcessingStarted] = useState(false);

  console.log(category);
  
  const allTools = [
    ...basicTools, 
    ...advancedTools, 
    ...visualizationTools, 
    ...sentimentTools
  ];
  
  const tool = allTools.find(t => t.id === toolId);
  
  if (!tool) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Tool not found</p>
        <button 
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Tools
        </button>
      </div>
    );
  }

  // Function to process text based on tool
  const processText = async () => {
    if (processingStarted) return;
    
    setProcessingStarted(true);
    setLoading(true);
    setError(null);
    
    try {
      // Here you would normally call your API with the content and tool action
      // For now we'll simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock results based on tool action
      let processedResult = '';
      
      switch (tool.action) {
        case 'count-words':
          processedResult = `Total words: ${content.trim().split(/\s+/).filter(Boolean).length}`;
          break;
        case 'count-punctuation':
          processedResult = `Total punctuation marks: ${content.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)?.length || 0}`;
          break;
        case 'most-repeated-word':
          const wordFrequency = content
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2)
            .reduce((acc, word) => {
              acc[word] = (acc[word] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
          
          const mostRepeated = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 1);
          
          processedResult = mostRepeated.length ? 
            `Most repeated word: "${mostRepeated[0][0]}" (${mostRepeated[0][1]} times)` : 
            'No repeated words found';
          break;
        case 'to-lowercase':
          processedResult = content.toLowerCase();
          break;
        case 'to-uppercase':
          processedResult = content.toUpperCase();
          break;
        case 'replace-word':
          if (!inputValue) {
            processedResult = 'Please enter a word to replace and its replacement (format: word:replacement)';
          } else {
            const [target, replacement] = inputValue.split(':');
            if (!replacement) {
              processedResult = 'Invalid format. Please use word:replacement';
            } else {
              processedResult = content.replace(new RegExp(target, 'g'), replacement);
            }
          }
          break;
        // Add more cases for other tools
        default:
          processedResult = `This functionality (${tool.action}) would be implemented via API call`;
      }
      
      setResult(processedResult);
    } catch (err) {
      setError('An error occurred while processing your request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Process text when tool is mounted
  useEffect(() => {
    if (!processingStarted && tool.action !== 'replace-word') {
      processText();
    }
  }, [tool.id]);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center bg-gray-50">
        <button
          onClick={onBack}
          className="mr-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <tool.icon className="h-5 w-5 mr-2 text-indigo-600" />
          {tool.name}
        </h3>
      </div>
      
      <div className="p-6">
        {/* Show input field for tools that require it */}
        {tool.action === 'replace-word' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter word to replace and replacement (format: word:replacement)
            </label>
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="original:replacement"
              />
              <button
                onClick={processText}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
                disabled={loading}
              >
                Process
              </button>
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            <p className="ml-3 text-gray-600">Processing...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {/* Result */}
        {!loading && result && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Result:</h4>
            <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 