import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

class Editor extends Component {
  constructor(props) {
		super(props);
		const { value, placeholder = '' } = this.props;
    this.state = { value, placeholder };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
		this.setState({ value });
		if (this.props.onChange) this.props.onChange(value);
  }

  render() {
		const { value, placeholder } = this.state;

    return (
      <div className="text-editor">
        <ReactQuill
					onChange={this.handleChange}
					value={value}
          placeholder={placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          theme={"snow"} // pass false to use minimal theme
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{header: []}, {size: []}, {color: []}],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
		['clean'],
  ],
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string
};

export default Editor;
