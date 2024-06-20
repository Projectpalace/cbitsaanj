import React, { useState } from 'react';
import useTextComparison from './useTextComparison';

const TextComparisonComponent = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const apiUrl = '/compare';
  const apiKey = 'YOUR_API_KEY_HERE';
  
  const { analysis, loading, error } = useTextComparison(text1, text2, apiUrl, apiKey);

  const handleCompare = () => {
    const { analysis, loading, error } = await  useTextComparison(text1, text2, apiUrl, apiKey);
  };

  return (
    <div>
      <textarea
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        placeholder="Enter first text"
      />
      <textarea
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        placeholder="Enter second text"
      />
      <button onClick={handleCompare}>Compare Texts</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {analysis && <div>
        <h2>Analysis Result:</h2>
        <pre>{JSON.stringify(analysis, null, 2)}</pre>
      </div>}
    </div>
  );
};

export default TextComparisonComponent;
