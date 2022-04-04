import { FormEvent, useState, useEffect, ChangeEvent } from 'react';

import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth.scss';
import './styles.scss';

import asideBackground from '../../assets/images/background.png';
import webGalleryLogo from '../../assets/images/icon-mspaint.png';

import { Button } from '../../components/button/Button';
import FileUploader from '../../components/FileUploader';
import { database } from '../../services/firebase';
import { pushImage } from '../../services/firebaseDataService';

type category = {
    id: string,
    title: string,
    desc: string,
    authorId: string
}

/**
 * PostImage Page function: generate a template page with necessary components to user create/post a new image on server
 * @returns The html page template
 */
export function PostImage() {
    const { user, status, signIn } = useAuth();
    const [imgTitle, setImgTitle] = useState('');
    const [imgDesc, setImgDesc] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [dataImg, setdataImg] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState<category[]>([]);

    function handleCategorySelect(event: ChangeEvent<HTMLSelectElement>) {
        setCategoryId(event.target.value);
    }

    async function handlePushImage(event: FormEvent) {
        //Prevents the page from reloading when submitting the form
        event.preventDefault();

        // Prevents the creation of category with empty name
        if (imgTitle.trim() === '') {
            setErrorMessage('The image title cannot be empty.');
            return;
        }

        const imageFirebase = await pushImage({ title: imgTitle, desc: imgDesc, dataImg: dataImg, authorId: user?.id, categoryId: categoryId });

        if (imageFirebase) {
            setErrorMessage('');
            alert('Image sent successfully!');
            window.location.reload();
        }
    }

    useEffect(() => {
        const categoryRef = database.ref('categories');
        const categoriesCollection: category[] = [];

        categories.splice(0, categories.length);

        categoryRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                categoriesCollection.push({ id: childSnapshot.key, ...childData });
            });
            setCategories(categoriesCollection);
        });
    }, []);

    return (
        <div id="page-auth">
            <aside>
                <img src={asideBackground} alt="Ilustration about image gallery" />
                <strong>MSPaint Web Gallery</strong>
                <p>Publish a new drawing</p>

            </aside>

            <main>
                <div className="main-content">
                    <img src={webGalleryLogo} alt="Web Gallery logo" />

                    <h2>{user?.name}</h2>

                    <h3> Publish a new image: </h3>
                    <div className="separator">
                    </div>

                    <form onSubmit={handlePushImage}>

                        <label> Image Title:
                            <input type="text"
                                placeholder="Image Title"
                                aria-label="image-title"
                                onChange={event => setImgTitle(event.target.value)}
                                value={imgTitle} />

                        </label>

                        <label> Description:
                            <input type="text"
                                placeholder="Image Description"
                                aria-label="image-description"
                                onChange={event => setImgDesc(event.target.value)}
                                value={imgDesc} />

                        </label>

                        <label> Choose a category:
                            <select onChange={handleCategorySelect}>
                                {categories.map(category => {
                                    return (
                                        <option value={`${category.id}`}>{category.title}</option>
                                    )
                                }
                                )}
                            </select>
                        </label>

                        <br></br>

                        <label > Select a file:
                            <FileUploader imageData={dataImg} setImageData={setdataImg} />
                        </label>

                        <Button className="create-button" title="Send Image Button" type="submit">Create</Button>
                    </form>
                    <p className="info-messsage">
                        {errorMessage}
                    </p>
                    {/* <p>
                        <Link to="/home">MSPaint Web Gallery</Link>
                    </p> */}

                </div>
            </main>
        </div>
    )
}