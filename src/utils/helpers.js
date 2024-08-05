// Fonctions utilitaires pour le formatage, etc.
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretLeft);

AIzaSyA4TTdG5UovPmNZdP5Tlj5oc5sOJv2qbCw