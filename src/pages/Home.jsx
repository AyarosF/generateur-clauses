import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [selectedClause, setSelectedClause] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!selectedClause) return;

    switch (selectedClause) {
      case 'DPA':
        navigate('/dpa');
        break;
      case 'MENTION_INFO':
        navigate('/mention-info');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Générateur de clauses</h1>

      <div className="space-y-4 w-full max-w-sm">
        <select
          value={selectedClause}
          onChange={(e) => setSelectedClause(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">-- Sélectionnez une clause --</option>
          <option value="DPA">Clause DPA (sous-traitance)</option>
          <option value="MENTION_INFO">Mention d'information RGPD</option>
        </select>

        <button
          onClick={handleStart}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
