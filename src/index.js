import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react"
import { User } from "./stores/userInstances"
import { UsersStore } from "./stores/usersStore"
import { LocationsStore } from "./stores/locationsStore"
import { MyProfile } from './stores/myProfileStore';

const user = new User()
const usersStore = new UsersStore()
const locationsStore = new LocationsStore()
const myProfile = new MyProfile()
const stores = {user, usersStore, locationsStore, myProfile}


ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
