const colors = {
  main: "#EA3232",
  error: "#FF7171",
  error2: "#FDA848",
  background1: "#F8F8F8",
  background2: "#EFEFEF",
  background3: "#E0E0E0",
  background4: "#BCBCBC",
  background5: "#828282",
  background6: "#333",
  background7: "#0F0F0F",
};

const fontSizes = {
  title: "24px",
  subTitle: "20px",
  text: "14px",
  subText: "12px",
  description: "12px",
};

const commons = {
  boxShadow: `padding: 16px; margin: 8px; background-color: ${colors.background1}; box-shadow: 0 0 8px rgba(80, 80, 80, 0.1); border-radius: 10px;`,
  ellipsis:
    "width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
};

const theme = {
  colors,
  commons,
  fontSizes,
};

export default theme;
