import axios from "axios";

const App = () => {
  
  axios.post('/api/auth/login',{
    id: 'user10',
    password: 'user10'
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })

  return (
    <div className="App">
      axios test 중
    </div>
  );
}

export default App;
