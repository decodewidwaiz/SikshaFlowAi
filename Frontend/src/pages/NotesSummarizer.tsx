import { useState, useRef } from 'react';
import { Upload, FileText, Download, Copy, BookText } from 'lucide-react';

const NotesSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [textInput, setTextInput] = useState('');
  const [summary, setSummary] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<Array<{question: string, answer: string}>>([]);
  const [glossary, setGlossary] = useState<Array<{term: string, definition: string}>>([]);
  const [conceptMap, setConceptMap] = useState<Array<{parent: string, children: string[]}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [inputType, setInputType] = useState('pdf'); // 'pdf' or 'text'
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setTextInput('');
      setSummary([]);
      setFlashcards([]);
      setGlossary([]);
      setConceptMap([]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setFile(null);
    setFileName('');
    setSummary([]);
    setFlashcards([]);
    setGlossary([]);
    setConceptMap([]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setTextInput('');
      setSummary([]);
      setFlashcards([]);
      setGlossary([]);
      setConceptMap([]);
    }
  };

  const handleSummarize = async () => {
    if (!file && !textInput) {
      return;
    }

    setIsProcessing(true);
    setSummary([]);
    setFlashcards([]);
    setGlossary([]);
    setConceptMap([]);

    let response;
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        response = await fetch('http://localhost:5000/summarize', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:5000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes_text: textInput }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to summarize.');
      }

      const data = await response.json();
      const result = JSON.parse(data.result.raw_output.replace(/```json\n|```/g, ''));
      setSummary(result.summary || []);
      setFlashcards(result.flashcards || []);
      setGlossary(result.glossary || []);
      setConceptMap(result.concept_map || []);
    } catch (error) {
      console.error('Error summarizing:', error);
      // Handle error state in UI, e.g., show a notification
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadContent = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadSummary = () => {
    const content = summary.join('\n\n');
    downloadContent(content, 'summary.txt');
  };

  const downloadFlashcards = () => {
    const content = flashcards.map(fc => `Q: ${fc.question}\nA: ${fc.answer}`).join('\n\n');
    downloadContent(content, 'flashcards.txt');
  };

  const downloadGlossary = () => {
    const content = glossary.map(g => `${g.term}: ${g.definition}`).join('\n');
    downloadContent(content, 'glossary.txt');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1C1C1C] mb-6">Notes Summarizer</h1>
      
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium flex items-center gap-2 ${inputType === 'pdf' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
            onClick={() => setInputType('pdf')}
          >
            <Upload className="w-5 h-5" />
            Upload PDF
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center gap-2 ${inputType === 'text' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
            onClick={() => setInputType('text')}
          >
            <BookText className="w-5 h-5" />
            Paste Text
          </button>
        </div>

        {inputType === 'pdf' ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#E63946] transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {fileName ? fileName : 'Drag & drop your PDF file here'}
            </p>
            <p className="text-gray-500 mb-4">or</p>
            <button className="bg-[#E63946] text-white py-2 px-6 rounded-lg hover:bg-[#d32f3f] transition-colors">
              Browse Files
            </button>
            <p className="text-sm text-gray-500 mt-4">Supports PDF files up to 10MB</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
          </div>
        ) : (
          <textarea
            value={textInput}
            onChange={handleTextChange}
            placeholder="Paste your notes here..."
            className="w-full h-48 border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#E63946] transition-colors"
          />
        )}
        
        {(file || textInput) && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSummarize}
              disabled={isProcessing}
              className="bg-[#E63946] text-white py-3 px-8 rounded-lg hover:bg-[#d32f3f] transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Summarize Notes
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {(summary.length > 0 || flashcards.length > 0 || glossary.length > 0) && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'summary' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'flashcards' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('flashcards')}
            >
              Flashcards
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'glossary' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('glossary')}
            >
              Glossary
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'concept-map' ? 'text-[#E63946] border-b-2 border-[#E63946]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('concept-map')}
            >
              Concept Map
            </button>
          </div>
          
          {activeTab === 'summary' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <button
                  onClick={downloadSummary}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E63946]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {summary.map((point, index) => (
                    <li key={index} className="text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'flashcards' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Flashcards</h3>
                <button
                  onClick={downloadFlashcards}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E63946]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.map((card, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#E63946]">Q{index + 1}</h4>
                      <button
                        onClick={() => copyToClipboard(`${card.question}\n${card.answer}`)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium mb-2">{card.question}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">Answer:</p>
                      <p className="mt-1">{card.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'glossary' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Glossary</h3>
                <button
                  onClick={downloadGlossary}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E63946]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-2">
                  {glossary.map((item, index) => (
                    <li key={index} className="text-gray-700"><strong>{item.term}:</strong> {item.definition}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'concept-map' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Concept Map</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-2">
                  {conceptMap.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      <strong>{item.parent}</strong>
                      <ul className="list-disc pl-5 space-y-2">
                        {item.children.map((child, i) => (
                          <li key={i}>{child}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesSummarizer;
