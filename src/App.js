import "./App.css";
import useAppController from "./app-controller";
function App() {
  const { productList, onSearchDataChange, searchData } = useAppController();
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          placeHolder="Search here"
          onChange={onSearchDataChange}
        />
        {searchData && (
          <div
            style={{
              width: "30%",
              height: "350px",
              overflowY: "scroll",
            }}
          >
            {productList.map((item) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    alignSelf: "center",
                  }}
                >
                  <img
                    src={item.images}
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                    alt="Image not found"
                  />
                </div>
                <div style={{ alignItems: "center", height: "5%", margin: 0 }}>
                  <p>{item.name}</p>
                  <h6>{item.price}</h6>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
