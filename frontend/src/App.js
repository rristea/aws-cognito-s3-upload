import React, { Component } from 'react';
import './App.css';
import OAuthButton from './OAuthButton';
import S3ImageUpload from './S3ImageUpload';
import { Storage, Auth, Hub } from 'aws-amplify';

class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
                this.setState({authState: 'signedIn', authData: data.payload.data});
                break;
            case 'signIn_failure':
                this.setState({authState: 'signIn', authData: null, authError: data.payload.data});
                break;
            default:
                break;
        }
    });
    this.state = {
      authState: 'loading',
      authData: null,
      authError: null,
    }
  }

  componentDidMount() {
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="App">
        <S3ImageUpload/>
        {authState === 'loading' && (<div>loading...</div>)}
        {authState === 'signIn' && <OAuthButton/>}
        {authState === 'signedIn' && (<div><button onClick={this.signOut}>Sign out</button></div>)}
      </div>
    );
  }
}

export default App;
