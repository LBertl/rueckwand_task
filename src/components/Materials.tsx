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
        <span>Wähle dein Material:</span>
      </div>
      <div
        style={{
          display: "grid",
          width: "100%",
        }}
      >
        {materialList.map((item, index) => (
          <button
            type="button"
            key={item}
            onClick={() => setSelectedMaterial(index)}
            className="btn btn-active"
            style={{
              backgroundColor: `${index == selectedMaterial ? "rgb(207, 224, 255)" : "rgb(255, 255, 255)"}`,
              zIndex: `${index == selectedMaterial ? 1 : 0}`,
              margin: "5px 0 5px 0",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
