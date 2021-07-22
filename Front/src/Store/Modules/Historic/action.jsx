export const getUserHistoric = (historic) => ({
    type: "@historicData/GET",
    historic,
  });
  
  export const postUserHistoric = (postHistoric) => ({
    type: "@historicData/POST",
    postHistoric,
  });
  