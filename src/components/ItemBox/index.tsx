import { ItemType } from '../../ts/enums/ItemType';
import './styles.scss';

type ItemProps = {
    id: string,
    title: string,
    desc: string,
    imageUrl: string,
    type?: ItemType,
    categoryTitle?: string,
    action?(): void
}

/**
 * ItemBox Component : Receive a list of itens with images to be displayed
 * @param props : The data list with itens to be displayed
 * @returns : The html template that organize and show informations about the item list
 */
const ItemBox = ( props: ItemProps ) => {
    
    let itemUrl = `#`;
    let action = () => {};

    if (props.type === ItemType.Category){
        itemUrl = `/categories/${props.id}`;
    } else if (props.type === ItemType.Image) {        
        itemUrl = `#`;
        action = props.action || action;
    }

    return (
    <div className="responsive">
        <div className="gallery">
        <a href={itemUrl} onClick={action}>
            <img src={props.imageUrl} alt={props.title} width="600" height="400" />
    
            <div className="title">{props.title} </div>
            <div className="about-border"></div>
            
             { props.categoryTitle ?    
                 (<><div className="desc-image">{props.desc}</div>
                 <h4> # {props.categoryTitle}</h4> </>):
                 (<div className="desc">{props.desc}</div> )
            }
        </a>
        </div> 
    </div>        
    );    
};


export default ItemBox;
