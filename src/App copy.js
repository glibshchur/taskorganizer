import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user : null,
      performer : null,
      listName: "",
      cardName: "",
      editCardName: "",
      keyCard: "",
      keyList: "",
      inputKey: "",
      dataLists: [],
      dataCards: [],
      editing: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
    }
  
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      performer: this.state.performer,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      performer: '',
      username: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });

    const itemsRef = firebase.database().ref('items');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          performer: items[item].performer,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  _saveList = e => {
    if (this.state.listName === "") {
      alert("List cannot be empty");
    } else {
      const newListKey = firebase
        .database()
        .ref("lists/")
        .push().key;

      firebase
        .database()
        .ref("lists/")
        .update({
          [newListKey]: {
            listName: this.state.listName
          }
        });
      this.setState({
        listName: ""
      });
    }
  };

  _saveCard = (key, title, index, e) => {
    if (this.state.cardName === "") {
      alert("Card cannot be empty");
    } else {
      const newCardKey = firebase
        .database()
        .ref("cards/")
        .push().key;

      firebase
        .database()
        .ref("cards/")
        .update({
          [newCardKey]: {
            listKey: key.key,
            cardName: title.title
          }
        });

      this.setState({
        cardName: ""
      });
    }
  };

  _handleDeleteList = key => {
    const { dataCards } = this.state;
    console.log(dataCards);
    let countCardOnList = 0;

    for (let i = 0; i < dataCards.length; i++) {
      if (key === dataCards[i].listKey) {
        countCardOnList++;
      }
    }
    console.log("countCardOnList: " + countCardOnList);
    if (countCardOnList > 0) {
      for (let i = 0; i < dataCards.length; i++) {
        if (key === dataCards[i].listKey) {
          this._handleDeleteCard(dataCards[i].key);
        }
      }
    }

    firebase
      .database()
      .ref(`lists/${key}`)
      .remove();

    console.log("Success delete List");
    const myListLength = this.state.dataLists.length;
    if (myListLength === 1) {
      this.setState({
        dataLists: []
      });
    }
  };

  _handleDeleteCard = key => {
    firebase
      .database()
      .ref(`cards/${key}`)
      .remove();

    console.log("Success delete Card");
    const myCardLength = this.state.dataCards.length;
    // console.log(myCardLength)
    if (myCardLength === 1) {
      this.setState({
        dataCards: []
      });
    }
  };

  _handleMoveCard = (keyOfCard, moveByIndex) => {
    const { dataCards, dataLists } = this.state;
    // Get key from List destination movement
    // console.log(keyOfCard);
    const moveToAnotherList = dataLists[moveByIndex].key;
    // console.log(moveToAnotherList);
    let newKeyOfCard;
    for (let i = 0; i < dataCards.length; i++) {
      if (keyOfCard === dataCards[i].key) {
        newKeyOfCard = i;
      }
    }

    const newCard = dataCards[newKeyOfCard];

    firebase
      .database()
      .ref("cards/")
      .update({
        [newCard.key]: {
          listKey: moveToAnotherList,
          cardName: newCard.cardName
        }
      });
  };

  _handleChooseCard = key => {
    const { dataCards } = this.state;
    let indexOfCard;
    for (let i = 0; i < dataCards.length; i++) {
      if (key === dataCards[i].key) {
        indexOfCard = i;
      }
    }

    const editCard = dataCards[indexOfCard];

    this.setState({
      editCardName: editCard.cardName,
      keyCard: key,
      keyList: editCard.listKey
    });
  };

  _handleEdit = () => {
    const { editCardName, keyCard, keyList } = this.state;
    if (editCardName !== "") {
      firebase
        .database()
        .ref("cards/")
        .update({
          [keyCard]: {
            cardName: editCardName,
            listKey: keyList
          }
        });
    } else {
      alert("Card cannot be empty");
    }
  };


  render() {
    return ( 
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>Task Organizer</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
              :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="currentItem" placeholder="Enter Task" onChange={this.handleChange} value={this.state.currentItem} />
                  <input type="text" name="performer" placeholder="For whom?" onChange={this.handleChange} value={this.state.performer} />
                  <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email || this.state.username} />
                  <button>Add Item</button>
                </form>
              </section>
              <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Task for: {item.performer}</p>
                          <p>Added by: {item.user}
                            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                              <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          :
          <div className='wrapper'>
            <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
        }
      </div>

    );
  }
}

export default App;
