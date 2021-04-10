import './App.css';
import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: '',data : [] };
  }

  handleChange = (data) => {
    this.setState({question:data});
  }

  handleSubmit = (event) => {
    // alert('A form was submitted: ' + this.state);
    const link = 'http://localhost:4000?ques=' + this.state.question;
    console.log(link);
    fetch(link)
      .then( async data => {
        // console.log(data);
        const response = await data.json(); 
        console.log(response);
        this.setState({data:response.data});
      }).catch(error => {
        console.log("Something went wrong",error);
      });
    
    event.preventDefault();
}

  render() {

    const dataToPrint = this.state.data.map((d ,i)=> {
      if(i%2 === 0){
        return <h2>{d}</h2>;
      }else{
        return <p>{d}</p>;
      }
      
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} name="name" onChange={(event)=>this.handleChange(event.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {dataToPrint}
      </div>
      
    );
  }
}

function App() {
  return (
    <div className="App">
      <NameForm/>
    </div>
  );
}

export default App;
