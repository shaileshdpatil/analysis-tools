import { 
  FileText, 
  Check, 
  RotateCcw, 
  AlignJustify, 
  AlertCircle,
  Type, 
  Hash, 
  BarChart,
  Replace, 
  Cloud,
  Users,
  BadgeCheck,
  AlignLeft,
  FileBarChart,
  Layers,
  Bot,
  Anchor,
  Brain,
  Languages,
  CheckCheck,
  BookOpen,
  CloudSun,
  BarChart2,
  Heart
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  action: string;
}

export const basicTools: Tool[] = [
  {
    id: 'count-words',
    name: 'Count Words',
    description: 'Count the number of words in the text',
    icon: FileText,
    action: 'count-words'
  },
  {
    id: 'count-punctuation',
    name: 'Count Punctuation',
    description: 'Count punctuation marks in the text',
    icon: Check,
    action: 'count-punctuation'
  },
  {
    id: 'most-repeated-word',
    name: 'Show Most Repeated Word',
    description: 'Find the most frequently used word',
    icon: BarChart,
    action: 'most-repeated-word'
  },
  {
    id: 'least-repeated-word',
    name: 'Show Least Repeated Word',
    description: 'Find the least frequently used word',
    icon: BarChart2,
    action: 'least-repeated-word'
  },
  {
    id: 'to-lowercase',
    name: 'Convert to Lowercase',
    description: 'Convert all text to lowercase',
    icon: Type,
    action: 'to-lowercase'
  },
  {
    id: 'to-uppercase',
    name: 'Convert to Uppercase',
    description: 'Convert all text to uppercase',
    icon: Type,
    action: 'to-uppercase'
  },
  {
    id: 'remove-punctuation',
    name: 'Remove Punctuation',
    description: 'Remove all punctuation marks from the text',
    icon: Type,
    action: 'remove-punctuation'
  },
  {
    id: 'remove-numbers',
    name: 'Remove Numbers',
    description: 'Remove all numbers from the text',
    icon: Hash,
    action: 'remove-numbers'
  },
  {
    id: 'remove-whitespace',
    name: 'Remove Extra Whitespace',
    description: 'Remove unnecessary whitespace from the text',
    icon: AlignJustify,
    action: 'remove-whitespace'
  },
  {
    id: 'avg-word-length',
    name: 'Find Average Word Length',
    description: 'Calculate the average length of words',
    icon: Type,
    action: 'avg-word-length'
  },
  {
    id: 'avg-sentence-length',
    name: 'Find Average Sentence Length',
    description: 'Calculate the average length of sentences',
    icon: AlignLeft,
    action: 'avg-sentence-length'
  },
  {
    id: 'replace-word',
    name: 'Replace a Word/Phrase',
    description: 'Replace specified words or phrases',
    icon: Replace,
    action: 'replace-word'
  },
  {
    id: 'reverse-text',
    name: 'Reverse Text',
    description: 'Reverse the order of characters in the text',
    icon: RotateCcw,
    action: 'reverse-text'
  },
  {
    id: 'count-unique-words',
    name: 'Count Unique Words',
    description: 'Count the number of unique words in the text',
    icon: AlertCircle,
    action: 'count-unique-words'
  },
  {
    id: 'extract-proper-nouns',
    name: 'Extract Proper Nouns',
    description: 'Extract proper nouns from the text',
    icon: Users,
    action: 'extract-proper-nouns'
  }
];

export const advancedTools: Tool[] = [
  {
    id: 'word-tokenization',
    name: 'Word Tokenization',
    description: 'Split text into individual words',
    icon: Layers,
    action: 'word-tokenization'
  },
  {
    id: 'sentence-tokenization',
    name: 'Sentence Tokenization',
    description: 'Split text into individual sentences',
    icon: AlignLeft,
    action: 'sentence-tokenization'
  },
  {
    id: 'remove-stopwords',
    name: 'Remove Stopwords',
    description: 'Remove common stopwords from the text',
    icon: BadgeCheck,
    action: 'remove-stopwords'
  },
  {
    id: 'stemming',
    name: 'Stemming',
    description: 'Reduce words to their root/stem form',
    icon: Bot,
    action: 'stemming'
  },
  {
    id: 'lemmatization',
    name: 'Lemmatization',
    description: 'Reduce words to their base or dictionary form',
    icon: Brain,
    action: 'lemmatization'
  },
  {
    id: 'pos-tagging',
    name: 'POS Tagging',
    description: 'Mark words with their part of speech',
    icon: Anchor,
    action: 'pos-tagging'
  },
  {
    id: 'tf-idf',
    name: 'TF-IDF Vectorization',
    description: 'Calculate term frequency-inverse document frequency',
    icon: FileBarChart,
    action: 'tf-idf'
  },
  {
    id: 'text-summarization',
    name: 'Text Summarization',
    description: 'Generate a summary of the text',
    icon: BookOpen,
    action: 'text-summarization'
  },
  {
    id: 'language-detection',
    name: 'Language Detection',
    description: 'Detect the language of the text',
    icon: Languages,
    action: 'language-detection'
  },
  {
    id: 'spell-checking',
    name: 'Spell Checking & Grammar Correction',
    description: 'Identify and correct spelling and grammar errors',
    icon: CheckCheck,
    action: 'spell-checking'
  }
];

export const visualizationTools: Tool[] = [
  {
    id: 'word-cloud',
    name: 'Generate Word Cloud',
    description: 'Create a word cloud visualization',
    icon: Cloud,
    action: 'word-cloud'
  },
  {
    id: 'word-frequency',
    name: 'Word Frequency Plot',
    description: 'Plot word frequency distribution',
    icon: BarChart,
    action: 'word-frequency'
  },
  {
    id: 'sentiment-graph',
    name: 'Sentiment Analysis Distribution Graph',
    description: 'Visualize sentiment distribution in the text',
    icon: Heart,
    action: 'sentiment-graph'
  },
  {
    id: 'tf-idf-heatmap',
    name: 'TF-IDF Heatmap',
    description: 'Create a heatmap of TF-IDF values',
    icon: CloudSun,
    action: 'tf-idf-heatmap'
  }
];

export const sentimentTools: Tool[] = [
  {
    id: 'sentiment-analysis',
    name: 'Perform Sentiment Analysis',
    description: 'Analyze the sentiment of the text',
    icon: Heart,
    action: 'sentiment-analysis'
  }
]; 