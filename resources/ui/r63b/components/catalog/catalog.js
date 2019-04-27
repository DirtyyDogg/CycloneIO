import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import CatalogBanner from './components/banner.jsx'

import CatalogFrontPage from './pages/frontpage.jsx'
import CatalogFurniPage from './pages/furni.jsx'

export default class Alert extends Component {
	constructor(props) {
		super(props)

		this.state = {
			category: 0,

			// @@MOCK
			catalogue: [
				{ id: 0, parent: -1, type: 'category', name: 'Front Page' },
				{ id: 1, parent: -1, type: 'category', name: 'Furni', description: 'This is an example description' },
				{ id: 2, parent: -1, type: 'category', name: 'Clothing' },
				{ id: 3, parent: -1, type: 'category', name: 'Pets' },
				{ id: 4, parent: -1, type: 'category', name: 'Memberships' },
				{ id: 5, parent: 1, type: 'page', name: 'Spaces' }
			]
		}
	}

	componentDidMount() {
		dragElement(document.getElementById('catalog'))

		function dragElement(elmnt) {
		  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		  if (document.getElementById(elmnt.id + "_header")) {
		    // if present, the header is where you move the DIV from:
		    document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
		  } else {
		    // otherwise, move the DIV from anywhere inside the DIV:
		    elmnt.onmousedown = dragMouseDown;
		  }

		  function dragMouseDown(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // get the mouse cursor position at startup:
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    document.onmouseup = closeDragElement;
		    // call a function whenever the cursor moves:
		    document.onmousemove = elementDrag;
		  }

		  function elementDrag(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // calculate the new cursor position:
		    pos1 = pos3 - e.clientX;
		    pos2 = pos4 - e.clientY;
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    // set the element's new position:
		    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		  }

		  function closeDragElement() {
		    // stop moving when mouse button is released:
		    document.onmouseup = null;
		    document.onmousemove = null;
		  }
		}
	}

	render() {
		return (
			<div className='catalogue' id='catalog'>
				<div className='title' id='catalog_header'>
					Shop
				</div>

				<Tabs selectedTabClassName='active' selectedIndex={this.state.category} onSelect={category => this.setState({ category })}>
					<TabList className='tabs'>
						<Tab className='tab'>Front Page</Tab>
						<Tab className='tab'>Furni</Tab>
						<Tab className='tab'>Clothing</Tab>
						<Tab className='tab'>Pets</Tab>
						<Tab className='tab'>Memberships</Tab>
					</TabList>

					<TabPanel>
						<CatalogBanner 
							title='Front Page' 
							icon='https://i.imgur.com/vZzgS6P.png' 
							image='https://imgur.com/O1EqujY.gif' 
						/>
						<CatalogFrontPage />
					</TabPanel>
					
					<TabPanel>
						<CatalogBanner 
							title='Furni' 
							description='This is an example description' 
							icon='https://i.imgur.com/vZzgS6P.png'
							image='https://imgur.com/O1EqujY.gif' 
						/>
						<CatalogFurniPage />
					</TabPanel>
					<TabPanel>
						<div className='page'>
							Clothing
						</div>
					</TabPanel>
					<TabPanel>
						<CatalogBanner title='Pets' icon='https://i.imgur.com/vZzgS6P.png' image='https://imgur.com/O1EqujY.gif' />
						<div className='page'>
							Pets
						</div>
					</TabPanel>
					<TabPanel>
						<div className='page'>
							Memberships
						</div>
					</TabPanel>
				</Tabs>				
			</div>
		)
	}
}
