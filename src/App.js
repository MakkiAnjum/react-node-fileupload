import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = e => {
    this.setState({ selectedFile: e.target.files[0], loaded: 0 });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post('http://localhost:8000/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        toast.success('uploaded successfully.');
      })
      .catch(err => {
        toast.error('uploading failed.');
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload your file</label>
              <input
                type="file"
                name="file"
                onChange={this.onChangeHandler}
                className="form-control"
                multiple=""
              />
            </div>
            <div className="form-group">
              <Progress max="100" color="success" value={this.state.loaded}>
                {Math.round(this.state.loaded, 2)}%
              </Progress>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </button>
            <div className="form-group">
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
