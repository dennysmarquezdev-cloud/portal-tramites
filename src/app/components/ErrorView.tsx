import React from "react";
import LottieDefault from "lottie-react";
import fishAnimation from "../../assets/nature/icons8-top-view-fish.json";

const Lottie = (LottieDefault as any).default || LottieDefault;

export function ErrorView({ code, title, message, onAction, actionText, imgName }: { code: string; title: string; message: string; onAction: () => void; actionText: string; imgName: string }) {
  return (
    <div style={{ display:"flex",minHeight:"100vh",width:"100vw",background:"#F8FAFC",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:24,fontFamily:"'Inter', sans-serif",textAlign:"center" }}>
      {imgName === "icons8-top-view-fish" ? (
        <div style={{ maxWidth: 400, width: "100%", marginBottom: 32 }}>
          <Lottie animationData={fishAnimation} loop={true} />
        </div>
      ) : (
        <img src={`/img/${imgName}.png`} alt={`Error ${code}`} style={{ maxWidth: 400, width: "100%", height: "auto", marginBottom: 32 }} />
      )}
      <h2 style={{ color:"#090C48",fontWeight:800,fontSize:32,marginBottom:12 }}>{title}</h2>
      <p style={{ color:"#64748B",fontSize:16,maxWidth:450,marginBottom:32,lineHeight:1.6 }}>{message}</p>
      <button onClick={onAction} style={{ background:"linear-gradient(135deg,#0D6EFD,#0056d2)",color:"#FFFFFF",border:"none",borderRadius:12,padding:"14px 32px",fontSize:15,fontWeight:600,cursor:"pointer",boxShadow:"0 8px 25px rgba(13,110,253,0.3)",transition:"transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
        {actionText}
      </button>
    </div>
  );
}

export interface ScreenBAccessDeniedProps {
  userEmail: string;
  onBack: () => void;
}

export function ScreenB_AccessDenied({ userEmail, onBack }: ScreenBAccessDeniedProps) {
  return (
    <ErrorView 
      code="403" 
      imgName="403"
      title="Acceso Denegado"
      message={`La cuenta ${userEmail} no tiene los permisos necesarios para acceder a esta área. Por favor, comunícate con el administrador del sistema.`}
      actionText="Volver a iniciar sesin"
      onAction={onBack}
    />
  );
}
