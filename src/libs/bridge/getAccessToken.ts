const getAccToken = (accToken: string) =>
  alert(`ACCESS TOKEN RECEIVED, ${accToken}`);

const _global = (window /* browser */ || global) /* node */ as any;
_global.getAccessToken = getAccToken;
