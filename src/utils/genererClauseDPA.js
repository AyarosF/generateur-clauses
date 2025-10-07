export function genererClauseDPA(formData) {
  return `
ACCORD DE SOUS-TRAITANCE DE DONNÉES PERSONNELLES
(Data Processing Agreement - DPA)

Entre les soussignés :

${formData.responsableTraitement || '[Responsable du traitement]'}, ci-après dénommé le "Responsable du traitement",

Et

${formData.sousTraitant || '[Sous-traitant]'}, ci-après dénommé le "Sous-traitant",

Il a été convenu ce qui suit :

ARTICLE 1 - OBJET
Objet du contrat principal : ${formData.objetContrat || '[À compléter]'}

ARTICLE 2 - DESCRIPTION DU TRAITEMENT
2.1 Nature et finalité du traitement
Nature : ${formData.natureTraitement || '[À compléter]'}
Finalité : ${formData.finalite || '[À compléter]'}

2.2 Catégories de données traitées
${formData.categoriesDonnees.length > 0 
  ? formData.categoriesDonnees.map(cat => `- ${cat}`).join('\n')
  : '- [À compléter]'}

2.3 Catégories de personnes concernées
${formData.categoriesPersonnes.length > 0
  ? formData.categoriesPersonnes.map(cat => `- ${cat}`).join('\n')
  : '- [À compléter]'}

2.4 Durée de conservation
Les données seront conservées pendant : ${formData.dureeConservation || '[À compléter]'}

ARTICLE 3 - OBLIGATIONS DU SOUS-TRAITANT
Le Sous-traitant s'engage à respecter les obligations prévues par le RGPD.

ARTICLE 4 - MESURES DE SÉCURITÉ
${formData.mesuresSecurite.length > 0
  ? formData.mesuresSecurite.map(mesure => `- ${mesure}`).join('\n')
  : '- [Mesures de sécurité à définir]'}

- Formation régulière du personnel
- Politique de gestion des incidents de sécurité
- Mise à jour régulière des systèmes

ARTICLE 5 - SOUS-TRAITANCE ULTÉRIEURE

5.1 Le Sous-traitant ne peut faire appel à un autre sous-traitant sans l'autorisation écrite du Responsable du traitement.
5.2 Les mêmes obligations en matière de protection des données s'appliquent au sous-traitant ultérieur.


ARTICLE 6 - ASSISTANCE ET COOPÉRATION

Le Sous-traitant aide le Responsable du traitement à répondre aux demandes d'exercice des droits des personnes concernées.

ARTICLE 7 - SORT DES DONNÉES À L'ISSUE DU CONTRAT

Destruction ou restitution des données selon les instructions du Responsable du traitement.

ARTICLE 8 - AUDIT ET CONTRÔLE

Le Sous-traitant met à disposition toutes les informations nécessaires pour démontrer le respect du RGPD.

ARTICLE 9 - DOCUMENTATION

Tenue d'un registre des activités de traitement selon l'article 30.2 du RGPD.

ARTICLE 10 - RESPONSABILITÉ

Chaque partie est responsable des dommages causés par un traitement non conforme.

ARTICLE 11 - DURÉE ET RÉSILIATION

Le présent accord entre en vigueur à la date de signature et prend fin à la fin de la relation contractuelle.

${formData.transfertHorsUE === 'oui' ? `
ARTICLE 12 - TRANSFERTS DE DONNÉES HORS DE L'UNION EUROPÉENNE
Pays de destination : ${formData.paysTransfert || '[À compléter]'}
Garanties appropriées : ${formData.garantiesTransfert || '[À compléter]'}
` : ''}

Fait en deux exemplaires originaux,

À _________________, le _________________

Pour le Responsable du traitement          Pour le Sous-traitant
Nom et signature :                          Nom et signature :

---
Document généré le ${new Date().toLocaleDateString('fr-FR')} avec le Générateur de Clauses DPA
Ce document est un modèle à adapter selon votre situation spécifique.
Consultation d'un conseil juridique recommandée.
`.trim();
}
