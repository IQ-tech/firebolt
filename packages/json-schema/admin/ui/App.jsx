

const App = () => {
  function runCallback() {
    alert("is running");
  }

  return (
    <div>
      <p css={{color: red}}>lala</p>
      <button onClick={runCallback}>test alert</button>
    </div>
  );
};

export default App;
