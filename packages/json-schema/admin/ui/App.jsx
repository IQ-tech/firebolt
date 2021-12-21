const App = () => {
  function runCallback() {
    alert("is running");
  }

  return <button onClick={runCallback}>test alert</button>;
};

export default App;
