import { withOAuth } from 'aws-amplify-react';
import { Storage} from 'aws-amplify';
import React, { Component } from 'react';

class S3ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Upload Image'
    }
  }
  onChange(e) {
      this.setState({message: 'Uploading...'});
      const file = e.target.files[0];
      Storage.put(file.name, file, {
          contentType: 'image/png'
      })
      .then (result => {
        console.log(result);
        this.setState({message: 'Success'});
      })
      .catch(err => {
        console.log(err);
        this.setState({message: 'Fail'});
      });
  }

  render() {
      return (
        <div>
          <p>{this.state.message}</p>
          <input
              type="file" accept='image/png'
              onChange={(evt) => this.onChange(evt)}
          />
        </div>
      )
  }
}

export default S3ImageUpload;