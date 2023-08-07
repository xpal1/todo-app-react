import React from "react";
import "../components/css/style.css";

function TodoNotFound() {
  return (
    <>
      <div className="notfound">
        <div className="notfound-404">
          <h1 className="notfound-404-h1">:(</h1>
        </div>
        <h2 className="notfound-404-h2">Nenašli sa žiadne ToDo položky</h2>
        <p className="notfound-404-p">
          Momentálne sa tu nenachádzajú žiadne ToDo položky, ak chcete nejakú
          položku pridať, napíšte jej názov nižšie a kliknite na tlačidlo "Add"
        </p>
      </div>
    </>
  );
}

export default TodoNotFound;