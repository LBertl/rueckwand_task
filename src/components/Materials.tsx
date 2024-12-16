interface materialProps {
  materialList: string[];
  selectedMaterial: number;
  setSelectedMaterial: (id: number) => void;
}

export default function Materials({ materialList, selectedMaterial, setSelectedMaterial }: materialProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "15% 85%",
        width: "100%",
      }}
    >
      <div className="center">
        <h3>Wähle dein Material:</h3>
      </div>
      <div
        style={{
          display: "grid",
          width: "100%",
          padding: "10%",
          overflow: "hidden",
        }}
      >
        {materialList.map((item, index) => (
          <button
            type="button"
            key={item}
            onClick={() => setSelectedMaterial(index)}
            style={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "5px 5px",
              boxSizing: "border-box",
              border: `${index == selectedMaterial ? "rgb(28, 141, 103) 2px solid" : "none"}`,
              backgroundColor: `${index == selectedMaterial ? "rgb(248, 255, 252)" : "rgb(255, 255, 255)"}`,
              fontSize: "18pt",
              margin: "0 0 10px 0",
              padding: "5px",
              boxShadow: "rgba(152, 152, 152, 0.35) 0px 5px 15px",
              position: "relative",
              zIndex: `${index == selectedMaterial ? 1 : 0}`,
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
