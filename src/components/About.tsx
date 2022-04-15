import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";


export default function About() {
    return <>
         <main>
      <Header />
      <Navbar />
          <div className="logo">
               
          </div>
          <div className="container">
        <h1>About Us</h1>
        <ul>
            <li>Jack Bohm</li>
            <li>Jovan Jester</li>
        </ul>
        </div>
    </main>

    </>;

}