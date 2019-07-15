import React, { Component } from 'react'
// import Script from 'react-load-script'

import '../client/index.styl'

import Wallet from '../../components/wallet'
import Toolbar from '../../components/toolbar'

import Catalog from '../../components/dialogs/catalog'

import Actions from '../../components/actions'
import Chat from '../../components/chat/bubble'
import Chatbox from '../../components/chatbox'

import Moderation from '../../components/dialogs/moderation'

import Poll from '../../components/poll'

import {Engine} from '../../../../../client/games/game'


export default class Room extends Component<any, any> {

	private engine: Engine

	constructor(props: any) {
		super(props)
	}

	componentDidMount()
	{
		this.engine = new Engine('game')
		//const script = document.createElement('script')
		//script.src = 'http://localhost:8082/client.js'
		//document.body.appendChild(script)
	}

	componentWillReceiveProps(nextProps: any) {
		this.engine.gotoRoom(nextProps.roomData)
	}

	render() {
		return(
			<div className='client'>
				{/* <Script url='http://localhost:8080/client.js' /> */}
				<Actions />

				<div className='room' id='game'></div>

				<Moderation />
				<Chatbox />
				
				{/* <Catalog /> */}

				{/* <Poll question='Cyclone or Habbo' status={false} /> */}
				{/* <Chat
					name='EZ-C'
					avatar='https://cdn.discordapp.com/attachments/557261127847772161/577965083905359892/Screenshot_from_2019-05-14_23-02-49.png'
					type='shout'
					style={2}
					message='This is an example message'
				/> */}
				<Wallet />
				<Toolbar isClient={true} />
			</div>
		)
	}
}