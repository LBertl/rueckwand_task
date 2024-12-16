export function ImageWrapper({ imgsrc, children }: { imgsrc: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        position: "relative",
        backgroundSize: "cover",
        backgroundImage: `url(${imgsrc})`,
      }}
    >
      {children}
    </div>
  );
}
