import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { Category } from '../../ts/types/Category';
import { Images } from '../../ts/types/Images';
import { ItemType } from '../../ts/enums/ItemType';

import { useAuth } from '../../hooks/useAuth';
import { database } from "../../services/firebase";

import Header from '../../components/Header';
import ItemBox from '../../components/ItemBox';
import Modal from '../../components/Modal';

import './styles.scss'


type categoryParams = {
    id: string;
}

type CallbackProps = {
    setVisibility?: () => void;
    setImage?: (image: Images) => void;
};


/**
 * Category Page function: generate a template page with necessary components to category page that show all images from a selected category
 * @returns The html page template
 */
export function CategoryPage() {
    
    // verify if user is logged using the useAuth hook
    const { user, status, signIn } = useAuth();
    const [modalStatus, setModalStatus] = useState(false);

    const params = useParams<categoryParams>();
    const categoryId = params.id;

    const [category, setCategory] = useState<Category>({
        id: "",
        title: "",
        desc: "",
        authorId: "",
        dataImg: "",
    });

    const [imagesList, setImagesList] = useState<Images[]>([]);

    const callbackRef = React.useRef<CallbackProps>();
    function registerCallback(callback: CallbackProps) {
        callbackRef.current = callback;
    }

    useEffect(() => {
        // Load Category information
        const categoryRef = database.ref(`categories/${categoryId}`);

        categoryRef.once('value', (loadedCategory: any) => {
            setCategory({ id: categoryId, ...loadedCategory.val() });
        })

        //Load Images from category
        const imagesRef = database.ref(`categories/${categoryId}/images`);
        const imagesCollection: Images[] = [];

        imagesRef.on('value', function (snapshot: any) {
            snapshot.forEach(function (childSnapshot: any) {
                var childData = childSnapshot.val();
                console.log(childData);
                imagesCollection.push({ id: childSnapshot.key, ...childData });
            });

            setImagesList(imagesCollection);
        });

    }, [categoryId]);

    return (
        <div className="App-header" title="Webgallery App">
            <div id="wrapper">
                <Header />

                <main>
                    <div className="user-info">
                        <h2>Welcome! {user?.name}</h2>
                    </div>

                    <div className="separator-one" />

                    <h2 className="categories-view-title"> {category.title} </h2>
                    <p>{category.desc}</p>

                    <Modal modalStatus={modalStatus} registerCallback={registerCallback} />

                    <div className="list-images">
                        {imagesList.map(image => {

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
                </main>
            </div>
        </div>
    )
}