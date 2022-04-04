import React from 'react'
/**
 * Class File Upload Component
 * Makes avaliable a interface to upload a file from user device and post on app database
 */
class FileUploader extends React.Component {

    constructor(props) {
        super();

        this.state = {
            selectedFile: props.imageData,
            setImageData: props.setImageData
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // handle with changes on file upload input
    handleInputChange(event) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        // load the data image that user selected
        reader.onload = (e) => {

            console.log('state on fileuploader 2:', this.state)
            this.setState({
                selectedFile: e.target.result,
                setImageData: this.state.setImageData
            });
            console.log('state on fileuploader: 3', this.state)
            this.state.setImageData(e.target.result);            
        }

    }

    // on submit change the imageData prop state from parent Page/Element that call the file uploader component
    submit() {
        const formData = { image: this.state.selectedFile }
        //console.log(formData);
    }

    // create the html template
    render() {
        return (
            <div title="File Uploader">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <div className="form-row">
                            <div className="form-group col-md-6">                                
                                <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className="form-row">                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileUploader;