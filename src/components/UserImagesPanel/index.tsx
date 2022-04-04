import React, { useState } from 'react';
import { ItemType } from '../../ts/enums/ItemType';
import { Images } from '../../ts/types/Images';

import Modal from '../../components/Modal';
import ItemBox from '../../components/ItemBox';
import { ModalContextProvider } from '../../contexts/ImageModalContext';

import './styles.scss';

type ImagesProps = {
    images: Images[];
}
type CallbackProps = {
    setVisibility?: () => void;
    setImage?: (image: Images) => void;
};

/**
 * UserImagesPanel Component
 * @param props 
 * @returns 
 */
const UserImagesPanel = (props: ImagesProps) => {

    const images: Images[] = props.images;
    const [modalStatus, setModalStatus] = useState(false);

    const callbackRef = React.useRef<CallbackProps>();
    function registerCallback(callback: CallbackProps) {
        callbackRef.current = callback;
    }

    return (
        <ModalContextProvider>
            <div className="categories-panel">
                <h2 className="user-drawings-view-title panel-list-images">My Drawings</h2>

                <Modal modalStatus={modalStatus} registerCallback={registerCallback} />
                <div className="user-drawings-view">

                    {images.map(image => {

                        const imageAction = () => {
                            callbackRef.current?.setVisibility!();
                            callbackRef.current?.setImage!(image);
                        }
                        return (
                            <ItemBox key={image.id} id={image.id} title={image.title}
                                desc={image.desc} imageUrl={image.dataImg}
                                categoryTitle={image.categoryTitle} type={ItemType.Image}
                                action={imageAction} />
                        )
                    })}

                </div>

            </div>

        </ModalContextProvider>
    )
}

export default UserImagesPanel;