import React, { Component } from 'react';

import mime from 'mime-types';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class FileModal extends Component {
  state = { file: null, authorized: ['image/jpeg', 'image/png'] };

  addFile = event => {
    const file = event.target.files[0];

    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file && this.isAuthorized(file.name)) {
      const metaData = { contentType: mime.lookup(file.name) };
      uploadFile(file, metaData);
      closeModal();
      this.clearFile();
    }
  };

  clearFile = () => {
    this.setState({ file: null });
  };
  isAuthorized = filename => {
    return this.state.authorized.includes(mime.lookup(filename));
  };

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} closeModal={closeModal}>
        <Modal.Header>Select a image file</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            label="File types: jpg, png"
            type="file"
            name="file"
            onChange={this.addFile}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
            <Icon name="checkmark" /> Send
          </Button>

          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
