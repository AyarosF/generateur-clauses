export function genererMentionInfo(formData) {
  return `
MENTION D'INFORMATION RELATIVE À LA PROTECTION DES DONNÉES PERSONNELLES

Responsable du traitement : ${formData.responsable || '[À compléter]'}
Contact DPO / responsable de la protection des données : ${formData.contact || '[À compléter]'}
Finalité du traitement : ${formData.finalite || '[À compléter]'}
Base légale du traitement : ${formData.baseLegale || '[Ex : exécution d’un contrat, consentement, obligation légale]'}

Catégories de données collectées :
${formData.categoriesDonnees.length > 0
    ? formData.categoriesDonnees.map(cat => `- ${cat}`).join('\n')
    : '[À compléter]'}

Destinataires ou catégories de destinataires des données :
${formData.destinataires || '[À compléter]'}

Durée de conservation des données : ${formData.dureeConservation || '[À compléter]'}

Vos droits :
- Droit d'accès, rectification et effacement de vos données
- Droit à la limitation du traitement
- Droit à la portabilité des données
- Droit d'opposition
- Droit de retirer votre consentement à tout moment si la base légale du traitement est le consentement
- Droit d'introduire une réclamation auprès de la CNIL ou de l’autorité de contrôle compétente

Modalités d'exercice de vos droits :
Vous pouvez contacter le DPO ou le responsable du traitement à l'adresse suivante : ${formData.contact || '[À compléter]'}.

Transfert de données vers des pays tiers :
${formData.transfertHorsUE === 'oui'
    ? `Les données peuvent être transférées vers : ${formData.paysTransfert || '[À compléter]'}
Garanties mises en place : ${formData.garantiesTransfert || '[À compléter]'}`
    : 'Aucun transfert hors de l’Union Européenne n’est prévu.'}

---
Document généré le ${new Date().toLocaleDateString('fr-FR')} avec le Générateur de Mentions d'Information
`.trim();
}
