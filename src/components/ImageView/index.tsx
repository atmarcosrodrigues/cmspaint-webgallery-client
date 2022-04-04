import './styles.scss';

type ImageProps = {
    title: string,
    desc: string,
    authorId: string,
    dataImg: string
}

/**
 * Image View Component
 * @param imageProps : The data information about a image
 * @returns : The html template show infromation about the image
 */
export function ImageView(imageProps: ImageProps) {
    return (
        <div className="image-view">
            <h3>{imageProps.title}</h3>
            <p>{imageProps.desc}</p>
            <hr></hr>

            <img src={imageProps.dataImg} alt={imageProps.title} />

        </div>
    )
}