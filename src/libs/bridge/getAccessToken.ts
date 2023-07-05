const getAccToken = (accToken: string) => {
  const ele = document.createElement("p");
  const txt = document.createTextNode(accToken);
  ele.appendChild(txt);
  document.getElementById("root")?.appendChild(ele);
};

const _global = (window /* browser */ || global) /* node */ as any;
_global.getAccessToken = getAccToken;
