import React, { Component } from 'react';

// Import Materialize
import M from 'materialize-css';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.css';

class Footer extends Component {
	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	render() {
		return (
			// <footer className="page-footer teal">
			// 	<div className="row" id="footerText">
			// 		<div className="col ">
			// 			<h5>App name</h5>
			// 		</div>
			// 		<div className="col ">
			// 			<ul className="footerNames">
			// 				<li>Aldo </li>
			// 				<li>Ana </li>
			// 				<li>Lauren </li>
			// 				<li>Kanoa </li>
			// 			</ul>
			// 		</div>
			// 	</div>

			// 	<div className="footer-copyright">
			// 		<div className="container">
			// 			© 2020 Copyright Information
			// 			<a className="grey-text text-lighten-4 right" href="#!">
			// 				GitHub
			// 			</a>
			// 		</div>
			// 	</div>
			// </footer>

			 <footer>        
            <div class="footer-copyright">
             
              © 2020 Ana Luna | Aldo Carrillo | Kanoa McKay | Lauren Hooper
            
                   
                  
                
              
            </div>
          </footer>
		);
	}
}

export default Footer;
