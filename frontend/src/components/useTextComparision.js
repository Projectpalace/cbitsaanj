import { useState, useEffect } from 'react';
import axios from 'axios';

const useTextComparison = (text1, text2, apiUrl, apiKey) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const compareTexts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(apiUrl, {
          text1,
          text2,
          apiKey
        });

        setAnalysis(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (text1 && text2) {
      compareTexts();
    }
  }, [text1, text2, apiUrl, apiKey]);

  return { analysis, loading, error };
};

export default useTextComparison;
