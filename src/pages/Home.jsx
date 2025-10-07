import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!selectedTool) return;

    switch (selectedTool) {
      case 'DPA':
        navigate('/dpa');
        break;
      case 'MENTION_INFO':
        navigate('/mention-info');
        break;
      case 'REGISTRE':
        navigate('/registre');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-3xl text-center mb-10">
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Générateur RGPD & Conformité
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Cet outil vous aide à créer facilement vos documents de conformité RGPD :  
          clauses de sous-traitance, mentions d'information, et registre de traitements.  
          Simple, clair, et prêt à exporter en un clic.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Choisissez un générateur :
        </h2>

        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6"
        >
          <option value="">-- Sélectionnez un générateur --</option>
          <option value="DPA">📄 Clause DPA (Sous-traitance)</option>
          <option value="MENTION_INFO">📝 Mention d'information RGPD</option>
          <option value="REGISTRE">📊 Registre de traitements simplifié</option>
        </select>

        <button
          onClick={handleStart}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Commencer
        </button>
      </div>

      <footer className="mt-10 text-sm text-gray-500 text-center">
        <p>
          ⚖️ Cet outil est proposé à titre informatif.  
          Pensez à adapter les modèles à votre contexte spécifique.
        </p>
      </footer>
    </div>
  );
}
