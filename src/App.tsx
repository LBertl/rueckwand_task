import Materials from "./components/Materials";
import { CircleInfo, Circle } from "./components/Circles";
import { useState, useRef } from "react";

function App() {
  const imgsrc = "./src/assets/muster.png";
  const [circles, setCircles] = useState([{ id: 0, x: 100, y: 80 }]);
  const circleSize = 30;
  const imageDiv = useRef(null);

  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const materialList = ["Holz", "Marmor", "Stein", "Metall", "Fliesen"];

  const updateCirclePosition = (id: number, newX: number, newY: number) => {
    const newCircles = circles.map((circle) => {
      return circle.id === id ? { ...circle, x: newX, y: newY } : circle;
    });

    let updateValid = true;
    newCircles.forEach((cI) => {
      newCircles.forEach((cJ) => {
        if (cJ.id > cI.id) {
          const dV = { x: cJ.x - cI.x, y: cJ.y - cI.y };
          if (Math.sqrt(dV.x * dV.x + dV.y * dV.y) < circleSize) {
            updateValid = false;
          }
        }
      });
    });
    if (imageDiv.current != null) {
      newCircles.forEach((circle) => {
        circle.x = Math.max(0, Math.min(circle.x, imageDiv.current.clientWidth));
        circle.y = Math.max(0, Math.min(circle.y, imageDiv.current.clientHeight));
      });
    }
    if (updateValid) {
      setCircles(newCircles);
    }
  };

  return (
    <>
      <div // -- Grid Setup --
        className="font-monospace"
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridTemplateRows: "300px 300px 200px 80px",
        }}
      >
        <div // -- Image --
          className="center light-div"
          style={{
            gridArea: "1 / 1 / 4 / 2",
          }}
        >
          <div
            ref={imageDiv}
            style={{
              width: "90%",
              height: "90%",
              position: "relative",
              backgroundSize: "cover",
              backgroundImage: `url(${imgsrc})`,
              boxShadow: "rgba(152, 152, 152, 0.75) 0px 0px 30px",
            }}
          >
            {circles.map((circle) => (
              <Circle
                key={circle.id}
                id={circle.id}
                x={circle.x}
                y={circle.y}
                size={circleSize}
                onChange={updateCirclePosition}
              />
            ))}
          </div>
        </div>

        <div // -- Circle Info --
          className="light-div"
          style={{
            overflowY: "scroll",
            gridArea: "1 / 2 / 2 / 3",
          }}
        >
          {circles.map((circle) => (
            <CircleInfo
              key={circle.id}
              id={circle.id}
              x={circle.x}
              y={circle.y}
              size={circleSize}
              onChange={updateCirclePosition}
            />
          ))}
          <button
            onClick={() => {
              setCircles([...circles, { id: circles.length, x: 0, y: 0 }]);
            }}
            type="button"
            className="btn btn-secondary"
          >
            Kreis hinzufügen
          </button>
          <span className="center">Disclaimer: Darauf achten, dass kein Kreis in der Nähe von (0,0) ist!</span>
        </div>

        <div // -- Materials --
          className="light-div"
          style={{
            gridArea: "2 / 2 / 4 / 3",
            overflowY: "scroll",
          }}
        >
          <Materials
            materialList={materialList}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
          />
        </div>

        <div // -- Submit --
          className="light-div center"
          style={{
            gridArea: "4 / 2 / 5 / 3",
          }}
        >
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              circles.forEach((c) => {
                const perc = { x: 0, y: 0 };
                if (imageDiv.current != null) {
                  perc.x = Math.round((10 * c.x) / imageDiv.current.clientWidth) * 0.1;
                  perc.y = Math.round((10 * c.y) / imageDiv.current.clientHeight) * 0.1;
                }
                console.log(`Circle ID:${c.id}, X:${c.x}, Y:${c.y}, X%:${perc.x}, Y%:${perc.y}`);
              });
              console.log(materialList[selectedMaterial]);
            }}
          >
            Konsolen-Output
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
