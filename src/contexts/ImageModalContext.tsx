import { ReactNode, createContext, useState, useEffect } from "react";
import { Images } from "../ts/types/Images";

type ModalContextType = {
    modalStatus: boolean | undefined,
    image: Images | undefined;
    setImage: (image: Images) => void;  
    showModal: () => void;  
    hideModal: () => void;  
  }
  
  type ModalContextProviderProps = {
      children: ReactNode;
  }
  
  export const ImageModalContext = createContext({} as ModalContextType);
  
  
export function ModalContextProvider(props: ModalContextProviderProps) {

    const [modalStatus, setModaStatus] = useState(false);
    const [image, setImage] = useState<Images>( {
        id: '', 
        title: '', 
        desc: '',
        authorId: '',
        categoryId: '',
        categoryTitle: '',
        dataImg: ''     });

    
    const showModal = () => {
        console.log('show modal')
        setModaStatus(true);    
    }
    const hideModal = () => {
        setModaStatus(true);    
    }
    
    return (
        <ImageModalContext.Provider value= {{modalStatus, image, setImage, showModal, hideModal}}>
            {props.children}
        </ImageModalContext.Provider>

    )

}
 