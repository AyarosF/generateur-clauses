import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { genererMentionInfo } from '../utils/genererMentionInfo';

export default function GenerateurMentionInfo() {
  const [formData, setFormData] = useState({
    responsable: '',
    contact: '',
    finalite: '',
    basesLegales: [],
    categoriesDonnees: [],
    autresCategories: '',
    destinataires: '',
    dureeConservation: '',
    transfertHorsUE: 'non',
    paysTransfert: '',
    garantiesTransfert: ''
  });

  const [mentionGeneree, setMentionGeneree] = useState('');

  const categoriesDonneesOptions = [
    'Nom, prénom',
    'Email, téléphone',
    'Adresse IP',
    'Données financières',
    'Données de santé'
  ];

  const basesLegalesOptions = [
    'Consentement',
    'Exécution d’un contrat',
    'Obligation légale',
    'Protection des intérêts vitaux',
    'Mission d’intérêt public ou exercice d’autorité publique',
    'Intérêt légitime'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleAjouterAutres = () => {
    const newItem = formData.autresCategories?.trim();
    if (newItem && !formData.categoriesDonnees.includes(newItem)) {
      setFormData(prev => ({
        ...prev,
        categoriesDonnees: [...prev.categoriesDonnees, newItem],
        autresCategories: ''
      }));
    }
  };

  const generer = () => {
    setMentionGeneree(genererMentionInfo(formData));
  };

  const telecharger = () => {
    const element = document.createElement('a');
    const file = new Blob([mentionGeneree], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `MentionInfo_${formData.responsable || 'document'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (

     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Générateur mention d'information RGPD</h1>
          </div>
          <p className="text-gray-600">Créez votre mention d'information conforme RGPD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulaire gauche */}
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-50px)]">
          <div className="space-y-4">

            {/* Responsable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsable du traitement</label>
              <input
                type="text"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: ACME SAS"
              />
            </div>

            {/* Contact DPO */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact DPO</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: dpo@acme.com"
              />
            </div>

            {/* Finalité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finalité du traitement</label>
              <input
                type="text"
                name="finalite"
                value={formData.finalite}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Gestion de la relation client"
              />
            </div>

            {/* Bases légales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base(s) légale(s) du traitement</label>
              <div className="space-y-1 border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                {basesLegalesOptions.map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={formData.basesLegales.includes(option)}
                      onChange={() => handleCheckboxChange('basesLegales', option)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Catégories de données */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégories de données collectées</label>
              <div className="space-y-2 border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                {categoriesDonneesOptions.concat(
                  formData.categoriesDonnees.filter(item => !categoriesDonneesOptions.includes(item))
                ).map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={formData.categoriesDonnees.includes(option)}
                      onChange={() => handleCheckboxChange('categoriesDonnees', option)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Autres..."
                    value={formData.autresCategories}
                    onChange={(e) => setFormData(prev => ({ ...prev, autresCategories: e.target.value }))}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAjouterAutres}
                    className="px-2 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Destinataires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destinataires des données</label>
              <input
                type="text"
                name="destinataires"
                value={formData.destinataires}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Service comptabilité, prestataires externes"
              />
            </div>

            {/* Durée de conservation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée de conservation</label>
              <input
                type="text"
                name="dureeConservation"
                value={formData.dureeConservation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: 3 ans"
              />
            </div>

            {/* Transfert hors UE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transfert de données hors UE ?</label>
              <select
                name="transfertHorsUE"
                value={formData.transfertHorsUE}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>

            {formData.transfertHorsUE === 'oui' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination</label>
                  <input
                    type="text"
                    name="paysTransfert"
                    value={formData.paysTransfert}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Garanties mises en place</label>
                  <input
                    type="text"
                    name="garantiesTransfert"
                    value={formData.garantiesTransfert}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <button
              onClick={generer}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Générer la mention
            </button>
          </div>
        </div>

        {/* Aperçu droite */}
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-50px)] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Aperçu</h2>
            {mentionGeneree && (
              <button
                onClick={telecharger}
                className="flex items-center gap-2 bg-green-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex-1 overflow-y-auto">
            {mentionGeneree ? (
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">{mentionGeneree}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Remplissez le formulaire et cliquez sur "Générer la mention"</p>
                </div>
            </div>
            )}
          </div>
        </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Avertissement :</strong> Ce document est un modèle générique à adapter à votre situation spécifique. 
            Il ne constitue pas un conseil juridique. Nous recommandons fortement de consulter un avocat spécialisé 
            en protection des données pour valider et personnaliser ce document selon vos besoins.
          </p>
        </div>
    </div>
    </div>
  );
}
