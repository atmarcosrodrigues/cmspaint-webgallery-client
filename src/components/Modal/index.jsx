import React from 'react';
import Rodal from 'rodal';

import defaultGalleryImg from '../../assets/images/default-gallery.png';
import editButtonImg from '../../assets/images/edit.png';

// include styles
import 'rodal/lib/rodal.css';
import './styles.scss';

/**
 * Class Modal
 * Display a image modal with additional informations and option to edit the image on paint application
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.modalStatus || false,
      image: {
        id: 'id',
        title: 'title',
        desc: 'desc',
        authorId: 'authorId',
        categoryId: 'categoryId',
        categoryTitle: 'category',
        dataImg: defaultGalleryImg
      }
    };

    const setVisibility = (visibility = true) => {
      console.log('seting visibility');
      this.setState({ visible: visibility, image: this.state.image });
    }
    const setImage = (image) => {
      this.setState({ visible: true, image: image });
    }
    
    props.registerCallback({ setVisibility: setVisibility, setImage: setImage });
  }


  show() {
    this.setState({ visible: true });
    //showModal()
  }

  hide() {
    this.setState({ visible: false });
    //hideModal();
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.show.bind(this)}>show</button> */}

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>

          {/* <Rodal visible={modalStatus} onClose={this.hide.bind(this)}> */}

          <h2 className="modal-title">{this.state.image.title}</h2>
          <p className="modal-desc">{this.state.image.desc}</p>
          <img src={this.state.image.dataImg} alt={123} height="60%" />
          <p className="iamge-category">{this.state.image.categoryTitle}</p>
          <a href={`com.games.tecdroid.mspaintclassic://${this.state.image.id}`}>
            <img className="edit-button" src={editButtonImg} alt={'Edit Drawing'} width="80" />
          </a>

        </Rodal>
      </div>
    );
  }
}

export default Modal;