
import { useTranslation } from 'react-i18next'

function Dialog({ message, onDeleteShop, nameProduct }) {
    const { t } = useTranslation();
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
      onClick={() =>  onDeleteShop(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <h3 style={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        <h1 style={{ color: "blue", fontSize: "24px" }}>{nameProduct}</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() =>  onDeleteShop(true)}
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              marginRight: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
           {t('Yes')}
          </button>
          <button
            onClick={() =>  onDeleteShop(false)}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
           {t('No')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
