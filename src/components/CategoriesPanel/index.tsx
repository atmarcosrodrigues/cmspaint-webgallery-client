import { Category } from '../../ts/types/Category';
import ItemBox from '../../components/ItemBox';

import defaultGalleryImg from '../../assets/images/default-gallery.png';
import './styles.scss';
import { ItemType } from '../../ts/enums/ItemType';

type CategoriesProps = {
    categories: Category[];
}

/**
 * CategoriesPanel
 * @param props : the category data information
 * @returns a html template that show all categories from application 
 */
const CategoriesPanel = (props : CategoriesProps) => {

    const categories : Category[] = props.categories; //Category[] = [c1];

    return (
        <div className="categories-panel">
        <h2 className="categories-view-title panel-list-images">Image Categories</h2>
         
         <div className="categories-view" title="Image Categories Panel">

             {categories.map(category => {
                 const categoryImage = category.dataImg || defaultGalleryImg;
                return (
                 <ItemBox key={category.id} id={category.id} title={category.title} 
                 desc={category.desc} imageUrl={categoryImage}  type={ItemType.Category}/>                        
                 )
             })}

         </div>

        </div>
    )
}

export default CategoriesPanel;