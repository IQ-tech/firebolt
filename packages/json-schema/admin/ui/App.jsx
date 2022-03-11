import { useEffect } from "react"

const App = () => {
  function runCallback() {
    alert("is running");
  }
  console.log(window.electron)

  useEffect(() => {
    console.log(window.electron.batata("lele"))
  }, [])

  return (
    <div>
      <p css={{color: "red"}}>lala</p>
      <button onClick={runCallback}>test alert</button>
    </div>
  );
};

export default App;
