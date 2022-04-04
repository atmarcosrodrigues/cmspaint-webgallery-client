import { useEffect, useState } from 'react';

// Load common types
import { Category } from '../../ts/types/Category';
import { Images } from '../../ts/types/Images';
import { ScreenMode } from '../../ts/enums/ScreenMode';

// Load hook of authenctication and database Firebase services
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

// Load page components
import Header from '../../components/Header';
import CategoriesPanel from '../../components/CategoriesPanel';
import UserImagesPanel from '../../components/UserImagesPanel';
import Footer from '../../components/Footer';

// Load styles
import '../../styles/main.css';
import './styles.scss';

/**
 * Home Page: display main functionalities to user
 *             - navitage through the catetories of image drawns
 *             - see the user images saved 
 */
export function Home() {
    // Load the hook responsible to user login/authenctication with google
    const { user, status, signIn } = useAuth();

    // Create the necessary states to share user images, categories and screen mode
    const [ screenMode, setScreenMode ] = useState<ScreenMode>();
    const [ categories, setCategories] = useState<Category[]>([]);
    const [ userImages, setUserImages] = useState<Images[]>([]);

    // Select the mode Categories to list all categories avaliable
    const screenModeCategories = () => {
        setScreenMode(ScreenMode.Categories);        
    }
    // Select he mode User Images to list all image drawings post by the logged user
    const screenModeUserImages = () => {
        setScreenMode(ScreenMode.UserImages);
    }
    

    // Load the data from firebase
    useEffect(() => {

        const categoryRef = database.ref('categories');
        const categoriesCollection: Category[] = [];
        const userImagesCollection: Images[] = [];

        categoryRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();

            const categoryId = childSnapshot.key || '';
            categoriesCollection.push({id: categoryId, ...childData});
            
            if (childData.images) {                
                const imagesList = childData.images;
                const categoryTitle = childData.title;

                Object.keys(imagesList).forEach(imgId => {

                    if (imagesList[imgId].authorId == user?.id){
                        const image: Images = {id: imgId, title: imagesList[imgId].title,
                                                categoryId: categoryId,
                                                categoryTitle: categoryTitle,
                                                desc: imagesList[imgId].desc,
                                                authorId: imagesList[imgId].authorId,
                                                dataImg: imagesList[imgId].dataImg}
                        userImagesCollection.push(image);
                    }
                });                
            }

        });
    
        setCategories(categoriesCollection);      
        setUserImages(userImagesCollection);
            
        if (!screenMode) {
            setScreenMode(ScreenMode.Categories);
        }
    });  

    }, [user]);



    return (
      <div className="App-header" title="Webgallery App">
        <div id="wrapper">
            <Header />
        
            <main>
                <div className="main">
                    <div className="user-info">
                        <h2>Welcome! {user?.name}</h2>
                    </div>
                        
                    <div className="separator-one"> </div>
                    <section className="thumbnails" >
                        <div>
                            <a className="button-panel-select" onClick={screenModeCategories} title="Image Categories Button">Image Categories</a>
                        </div>

                        <div>
                            <a className="button-panel-select" onClick={screenModeUserImages} title="My Drawings Button">My Drawings</a>
                        </div>
                    </section>

                        {(screenMode == ScreenMode.UserImages) ? 
                            (<UserImagesPanel images={userImages} />) :
                            (<CategoriesPanel categories={categories} />)                             
                        }
                                     
                </div>
            </main>
                            
            <Footer />
        </div>

    </div>
    )    
}