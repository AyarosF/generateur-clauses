import React, { useState, useEffect } from 'react';
import { PlusCircle, Download, FileSpreadsheet, Trash2, Database } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function GenerateurRegistreSimplifie() {
  const [traitements, setTraitements] = useState([]);
  const [form, setForm] = useState({
    finalite: '',
    categoriesDonnees: [],
    baseLegale: [],
    personnes: [],
    destinataires: [],
    duree: '',
    mesures: []
  });
  const [autres, setAutres] = useState({
    categoriesDonnees: '',
    personnes: '',
    mesures: '',
    destinataires: ''
  });

  const categoriesDonneesOptions = [
    "Données d'identité (nom, prénom)",
    "Données de contact (email, téléphone)",
    "Données de connexion (IP, cookies)",
    "Données financières",
    "Données de santé"
  ];

  const personnesOptions = [
    "Clients",
    "Prospects",
    "Employés",
    "Fournisseurs",
    "Utilisateurs"
  ];

  const mesuresOptions = [
    "Chiffrement des données",
    "Contrôle d'accès",
    "Journalisation des accès",
    "Sauvegarde régulière",
    "Pseudonymisation",
    "Test de sécurité régulier"
  ];

  const destinatairesOptions = [
    "Sous-traitants",
    "Partenaires",
    "Autorités publiques",
    "Fournisseurs de services",
    "Autres"
  ];

  const baseLegaleOptions = [
    "Consentement de la personne concernée",
    "Exécution d'un contrat",
    "Obligation légale",
    "Protection des intérêts vitaux",
    "Exécution d'une mission d'intérêt public",
    "Intérêt légitime du responsable de traitement"
  ];

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const sauvegarde = localStorage.getItem('registreRGPD');
    if (sauvegarde) {
      setTraitements(JSON.parse(sauvegarde));
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('registreRGPD', JSON.stringify(traitements));
  }, [traitements]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const handleAjouterAutre = (key) => {
    const newItem = autres[key].trim();
    if (newItem && !form[key].includes(newItem)) {
      setForm(prev => ({
        ...prev,
        [key]: [...prev[key], newItem]
      }));
      setAutres(prev => ({ ...prev, [key]: '' }));
    }
  };

  const ajouterTraitement = () => {
    if (!form.finalite.trim()) return;
    setTraitements(prev => [...prev, form]);
    setForm({
      finalite: '',
      categoriesDonnees: [],
      baseLegale: [],
      personnes: [],
      destinataires: [],
      duree: '',
      mesures: []
    });
    setAutres({
      categoriesDonnees: '',
      personnes: '',
      mesures: '',
      destinataires: ''
    });
  };

  const supprimerTraitement = (index) => {
    setTraitements(prev => prev.filter((_, i) => i !== index));
  };

  const viderRegistre = () => {
    if (window.confirm('Voulez-vous vraiment supprimer tous les traitements enregistrés ?')) {
      setTraitements([]);
      localStorage.removeItem('registreRGPD');
    }
  };

  const exporterRegistre = (format) => {
    const headers = [
      ['Finalité', 'Catégories de données', 'Base légale', 'Personnes concernées', 'Destinataires', 'Durée de conservation', 'Mesures de sécurité']
    ];
    const data = traitements.map(t => [
      t.finalite,
      t.categoriesDonnees.join('; '),
      t.baseLegale.join('; '),
      t.personnes.join('; '),
      t.destinataires.join('; '),
      t.duree,
      t.mesures.join('; ')
    ]);
    const sheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Registre_RGPD');

    if (format === 'xlsx') {
      XLSX.writeFile(workbook, 'Registre_RGPD_Simplifie.xlsx');
    } else {
      const csv = XLSX.utils.sheet_to_csv(sheet);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Registre_RGPD_Simplifie.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderCheckboxSection = (label, options, key, allowAutres = true) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="space-y-1 max-h-36 overflow-y-auto border border-gray-200 rounded-lg p-2">
        {options.concat(allowAutres ? form[key].filter(item => !options.includes(item)) : []).map(opt => (
          <label key={opt} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="checkbox"
              checked={form[key].includes(opt)}
              onChange={() => handleCheckboxChange(key, opt)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}

        {allowAutres && (
          <div className="flex items-center mt-1 space-x-2">
            <input
              type="text"
              placeholder="Autres..."
              value={autres[key]}
              onChange={e => setAutres(prev => ({ ...prev, [key]: e.target.value }))}
              className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            <button
              type="button"
              onClick={() => handleAjouterAutre(key)}
              className="px-2 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileSpreadsheet className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Générateur de registre de traitements RGPD
            </h1>
          </div>
          <p className="text-gray-600">
            Créez, sauvegardez et exportez un registre simplifié des activités de traitement
          </p>
        </div>

        {/* Conteneur principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-green-600" /> Ajouter un traitement
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Finalité du traitement</label>
                <input
                  type="text"
                  name="finalite"
                  value={form.finalite}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Saisir la finalité"
                />
              </div>

              {renderCheckboxSection('Catégories de données', categoriesDonneesOptions, 'categoriesDonnees', true)}
              {renderCheckboxSection('Base légale', baseLegaleOptions, 'baseLegale', false)}
              {renderCheckboxSection('Personnes concernées', personnesOptions, 'personnes', true)}
              {renderCheckboxSection('Destinataires', destinatairesOptions, 'destinataires', true)}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée de conservation</label>
                <input
                  type="text"
                  name="duree"
                  value={form.duree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Ex : 3 ans à partir de la fin du contrat"
                />
              </div>

              {renderCheckboxSection('Mesures de sécurité', mesuresOptions, 'mesures', true)}

              <button
                onClick={ajouterTraitement}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-2"
              >
                Ajouter au registre
              </button>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" /> Registre actuel
              </h2>

              {traitements.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => exporterRegistre('xlsx')}
                    className="flex items-center gap-2 bg-green-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-700"
                  >
                    <Download className="w-4 h-4" />
                    Excel
                  </button>
                  <button
                    onClick={() => exporterRegistre('csv')}
                    className="flex items-center gap-2 bg-green-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-600"
                  >
                    <Download className="w-4 h-4" />
                    CSV
                  </button>
                  <button
                    onClick={viderRegistre}
                    className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 py-1 px-3 rounded-lg text-sm hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Vider
                  </button>
                </div>
              )}
            </div>

            {traitements.length === 0 ? (
              <div className="flex items-center justify-center text-gray-400 h-full py-20">
                <p>Aucun traitement ajouté pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      {[
                        'Finalité',
                        'Catégories de données',
                        'Base légale',
                        'Personnes',
                        'Destinataires',
                        'Durée',
                        'Mesures',
                        ''
                      ].map(header => (
                        <th
                          key={header}
                          className="border px-3 py-2 text-left text-gray-700 font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {traitements.map((t, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="border px-3 py-2">{t.finalite}</td>
                        <td className="border px-3 py-2">{t.categoriesDonnees.join('; ')}</td>
                        <td className="border px-3 py-2">{t.baseLegale.join('; ')}</td>
                        <td className="border px-3 py-2">{t.personnes.join('; ')}</td>
                        <td className="border px-3 py-2">{t.destinataires.join('; ')}</td>
                        <td className="border px-3 py-2">{t.duree}</td>
                        <td className="border px-3 py-2">{t.mesures.join('; ')}</td>
                        <td className="border px-3 py-2 text-center">
                          <button
                            onClick={() => supprimerTraitement(i)}
                            className="text-red-500 hover:text-red-700"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Avertissement :</strong> Ce registre est un modèle simplifié à adapter selon vos activités et vos traitements réels.
            Il ne constitue pas un conseil juridique. Consultez un expert en protection des données pour validation.
          </p>
        </div>
      </div>
    </div>
  );
}
