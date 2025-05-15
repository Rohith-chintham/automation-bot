
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange?: (code: string) => void;
  readonly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, readonly = false }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative code-editor-container w-full">
      <Tabs defaultValue="editor" className="w-full">
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-3 text-gray-500"
          >
            {copied ? (
              <>
                <Check size={16} className="mr-1" /> Copied
              </>
            ) : (
              <>
                <Copy size={16} className="mr-1" /> Copy
              </>
            )}
          </Button>
        </div>
        
        <TabsContent value="editor" className="mt-0">
          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => onChange && onChange(e.target.value)}
              readOnly={readonly}
              className="w-full h-64 bg-transparent outline-none resize-none font-mono text-sm"
              spellCheck="false"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <div className="code-editor overflow-auto h-64">
            <pre className="whitespace-pre-wrap">
              <code>{code}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeEditor;
