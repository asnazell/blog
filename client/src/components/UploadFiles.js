import React from "react";

export class UploadFiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      name: "",
      fileDes: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log("submit clicked");
    console.log(e);

    //Files are sent with the "multipart/form-data" content type, this is different to the URL encoded
    //we have been previously been using. Work could be done to send this using JSON but wouldn't recommend it at this time.
    // see here for info: https://stackoverflow.com/questions/9081079/rest-http-post-multipart-with-json
    //either send the image up
    const formData = new FormData(); //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    formData.append("myFile", this.state.file); //accessed as fieldName, filename on busboy file event

    //additional form fields and other values can be sent up as below, these are caught on the busboy 'field' event
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("author", this.state.author);
    formData.append("body", this.state.body);
    formData.append("fileDesc", this.state.fileDes);

    //optional check for file being added to form
    /*
        if(!this.state.file)
        {
            console.log("Please select a file or enter a name...");
            return;
        }
         */

    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    }).catch(e => console.log(e));

    console.log(response);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  render() {
    return (
      <React.Fragment>
        <label>File</label>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange} />
          <br />

          <label>Name</label>
          <input type="text" name="name" onChange={this.handleChange} />
          <br />

          <label>Description</label>
          <textarea
            value={this.state.value}
            name="fileDes"
            onChange={this.handleChange}
          />
          <br />

          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}
