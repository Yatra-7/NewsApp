import "./App.css";
import React, {useState} from "react";
import Navbar from "./components/Navbar";
import NewsForm from "./components/NewsForm";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const  App = () => {
  const pageSize=15;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
            <Route exact path="/" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="general" pageSize={ pageSize} country="us" category="General"/> } />
            <Route exact path="/business" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="business" pageSize={ pageSize} country="us" category="Business"/>} />
            <Route exact path="/entertainment" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="entertainment" pageSize={ pageSize} country="us" category="Entertainment"/>} />
            <Route exact path="/general" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="general" pageSize={ pageSize} country="us" category="General"/>} />
            <Route exact path="/health" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="health" pageSize={ pageSize} country="us" category="Health"/>} />
            <Route exact path="/science" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="science" pageSize={ pageSize} country="us" category="Science"/>} />
            <Route exact path="/sports" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="sports" pageSize={ pageSize} country="us" category="Sports"/>} />
            <Route exact path="/technology" element = {<NewsForm setProgress={ setProgress} apiKey={ apiKey} Form key="technology" pageSize={ pageSize} country="us" category="Technology"/>} />
          </Routes>
        </Router>
      </div>
    ); 
}
export default App;
