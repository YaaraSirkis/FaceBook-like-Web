import React from 'react';
 import './Sponsored.css';
 import coffe from './coffe.jpeg'
 import terminal from './terminal.jpeg'

 function Sponsored() {
     return (
         <div className= "Sponsored">
              <hr />
 <span>Sponsored</span>
                     <div className="coffe">
                         <div className="row g-3">
                             <div className="col-md-4">
                                 <img src={coffe} className="img-fluid rounded-start" alt="coffe"></img>
                             </div>
                             <div className="col-md-8">
                                 <div className="card-body">
                                     <h5 className="card-title">coffee time</h5>
                                     <p className="card-text">the best coffee you will try! </p>
                                     <p className="card-text"><small
                                         className="text-body-secondary">www.coffeetime.com</small>
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <hr />
                     <div className="terminal">
                         <div className="row g-3">
                             <div className="col-md-4">
                                 <img src={terminal} className="img-fluid rounded-start" alt="coffe"></img>
                             </div>
                             <div className="col-md-8">
                                 <div className="card-body">
                                     <h5 className="card-title">TerminalX</h5>
                                     <p className="card-text">FASHION is HERE </p>
                                     <p className="card-text"><small
                                         className="text-body-secondary">www.terminalx.com</small>
                                     </p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     </div>
     );
 }
 export default Sponsored; 