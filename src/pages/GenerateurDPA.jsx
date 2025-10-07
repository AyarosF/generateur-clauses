import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { genererClauseDPA } from '../utils/genererClauseDPA';

export default function GenerateurDPA() {
  const [formData, setFormData] = useState({
    responsableTraitement: '',
    sousTraitant: '',
    objetContrat: '',
    natureTraitement: '',
    finalite: '',
    categoriesDonnees: [],
    autresCategoriesDonnees: '',
    categoriesPersonnes: [],
    autresCategoriesPersonnes: '',
    dureeConservation: '',
    transfertHorsUE: 'non',
    paysTransfert: '',
    garantiesTransfert: '',
    mesuresSecurite: [],
    autresMesuresSecurite: ''
  });

  const [clauseGeneree, setClauseGeneree] = useState('');

  const categoriesDonneesOptions = [
    "Données d'identité (nom, prénom)",
    "Données de contact (email, téléphone)",
    "Données de connexion (IP, cookies)",
    "Données financières",
    "Données de santé"
  ];

  const categoriesPersonnesOptions = [
    "Clients",
    "Prospects",
    "Employés",
    "Fournisseurs",
    "Utilisateurs"
  ];

  const mesuresSecuriteOptions = [
    "Chiffrement des données",
    "Contrôle d'accès",
    "Journalisation des accès",
    "Sauvegarde régulière",
    "Pseudonymisation",
    "Test de sécurité régulier"
  ];

  const handleGenererClauseDPA = () => {
    const clause = genererClauseDPA(formData);
    setClauseGeneree(clause);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const telecharger = () => {
    const element = document.createElement('a');
    const file = new Blob([clauseGeneree], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `DPA_${formData.sousTraitant || 'contrat'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderCheckboxSection = (label, options, mainKey, autresKey) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
        {options.concat(
          formData[mainKey].filter(item => !options.includes(item))
        ).map(option => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              checked={formData[mainKey].includes(option)}
              onChange={() => handleCheckboxChange(mainKey, option)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            placeholder="Autres..."
            value={formData[autresKey]}
            onChange={(e) => setFormData(prev => ({ ...prev, [autresKey]: e.target.value }))}
            className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <button
            type="button"
            onClick={() => {
              const newItem = formData[autresKey]?.trim();
              if (newItem && !formData[mainKey].includes(newItem)) {
                setFormData(prev => ({
                  ...prev,
                  [mainKey]: [...prev[mainKey], newItem],
                  [autresKey]: '' 
                }));
              }
            }}
            className="px-2 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Générateur DPA RGPD</h1>
          </div>
          <p className="text-gray-600">Créez votre accord de sous-traitance conforme RGPD</p>
        </div>

        {/* Grid Formulaire + Aperçu */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulaire */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col max-h-[calc(100vh-50px)] overflow-y-auto space-y-4">
            {/* Inputs texte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsable du traitement</label>
              <input
                type="text"
                name="responsableTraitement"
                value={formData.responsableTraitement}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sous-traitant</label>
              <input
                type="text"
                name="sousTraitant"
                value={formData.sousTraitant}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objet du contrat principal</label>
              <input
                type="text"
                name="objetContrat"
                value={formData.objetContrat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex : Hébergement de données clients"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nature du traitement</label>
              <input
                type="text"
                name="natureTraitement"
                value={formData.natureTraitement}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex : Collecte et stockage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Finalité du traitement</label>
              <textarea
                name="finalite"
                value={formData.finalite}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex : Gestion de la relation client"
              />
            </div>

            {renderCheckboxSection("Catégories de données traitées", categoriesDonneesOptions, "categoriesDonnees", "autresCategoriesDonnees")}
            {renderCheckboxSection("Catégories de personnes concernées", categoriesPersonnesOptions, "categoriesPersonnes", "autresCategoriesPersonnes")}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durée de conservation</label>
              <input
                type="text"
                name="dureeConservation"
                value={formData.dureeConservation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex : 3 ans à partir de la fin du contrat"
              />
            </div>

            {renderCheckboxSection("Mesures de sécurité", mesuresSecuriteOptions, "mesuresSecurite", "autresMesuresSecurite")}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transfert hors Union Européenne ?</label>
              <select
                name="transfertHorsUE"
                value={formData.transfertHorsUE}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>

            {formData.transfertHorsUE === "oui" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pays de destination</label>
                  <input
                    type="text"
                    name="paysTransfert"
                    value={formData.paysTransfert}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Garanties appropriées</label>
                  <textarea
                    name="garantiesTransfert"
                    value={formData.garantiesTransfert}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleGenererClauseDPA}
              className="w-full md:flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              Générer le DPA
            </button>
          </div>

          {/* Aperçu */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col max-h-[calc(100vh-50px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Aperçu du DPA</h2>
              {clauseGeneree && (
                <button
                  onClick={telecharger}
                  className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1 overflow-y-auto">
              {clauseGeneree ? (
                <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                  {clauseGeneree}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Remplissez le formulaire et cliquez sur "Générer le DPA"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avertissement */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Avertissement :</strong> Ce document est un modèle générique à adapter à votre situation spécifique. 
            Il ne constitue pas un conseil juridique. Nous recommandons fortement de consulter un avocat spécialisé 
            en protection des données pour valider et personnaliser ce contrat selon vos besoins.
          </p>
        </div>
      </div>
    </div>
  );
}
