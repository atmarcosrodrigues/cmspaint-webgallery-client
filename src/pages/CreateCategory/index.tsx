import { FormEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from '../../hooks/useAuth';
import { pushCategory } from '../../services/firebaseDataService';

import FileUploader from '../../components/FileUploader';
import { Button } from '../../components/button/Button';

import asideBackground from '../../assets/images/background.png';
import webGalleryLogo from '../../assets/images/icon-mspaint.png';
import '../../styles/auth.scss';


/**
 * Create Category Page function: generate a template page with necessary components to create a category
 * @returns The html page template
 */
export function CreateCategory() {
    // verify if user is logged using the useAuth hook
    const { user, status, signIn } = useAuth();
    const [newCategory, setNewCategory] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [dataImg, setdataImg] = useState('');

    const navigate = useNavigate();

    async function handleCreateCaregory(event: FormEvent) {
        //Prevents the page from reloading when submitting the form
        event.preventDefault();

        // Prevents the creation of category with empty name
        if (newCategory.trim() === '') {
            return;
        }

        // push image in firebase
        const categoryFirebase = await pushCategory({ title: newCategory, desc: newDesc, dataImg: dataImg, authorId: user?.id });
        if (categoryFirebase) {
            navigate(`/categories/${categoryFirebase.key}`)
        }
    }


    return (

        <div id="page-auth">
            <aside>
                <img src={asideBackground} alt="Ilustration about image gallery" />
                <strong>MSPaint Web Gallery</strong>
                <p>Create a new drawings category</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={webGalleryLogo} alt="Web Gallery logo" />

                    <h2>{user?.name}</h2>

                    <h3> Create a new Image Category: </h3>
                    <div className="separator">
                    </div>

                    <form onSubmit={handleCreateCaregory}>

                        <label> Category Name:
                            <input type="text"
                                placeholder="Category Name"
                                onChange={event => setNewCategory(event.target.value)}
                                value={newCategory} />
                        </label>


                        <label> Description:
                            <input type="text"
                                placeholder="Category Description"
                                onChange={event => setNewDesc(event.target.value)}
                                value={newDesc} />
                        </label>


                        <label > Select a image or icon to represent this category:
                            <FileUploader imageData={dataImg} setImageData={setdataImg} />
                        </label>

                        <Button type="submit">Create</Button>
                    </form>
                    {/* <p>
                        <Link to="/home">Paint Web Gallery</Link>
                    </p> */}

                </div>
            </main>
        </div>
    )
}