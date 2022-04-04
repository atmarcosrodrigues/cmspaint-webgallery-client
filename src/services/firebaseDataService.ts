
import { database } from '../services/firebase';

type category = {
  title: string,
  desc: string,
  dataImg: string,
  authorId: string | undefined;
}
type image = {
  title: string,
  desc: string,
  dataImg: string,
  categoryId: string;
  authorId: string | undefined;
}

/**
 * FirebaseDataService
 */

/**
 * pushCategory
 *    - Function to create/post a new category on firebase database
 * @param newCategory 
 * @returns the category posted on firebase
 */
async function pushCategory(newCategory: category) {
  const categoryRef = database.ref('categories');
  const { title, desc, dataImg, authorId } = newCategory;
  const categoryFirebase = await categoryRef.push({
    title: title,
    desc: desc || "",
    dataImg: dataImg || "",
    authorId: authorId
  });

  return categoryFirebase;

}

/**
 * pushImage
 *    - Function to create/post a new image on firebase database
 * @param newImage 
 * @returns : the image object posted on database
 */
async function pushImage(newImage: image) {
  const { title, desc, dataImg, authorId, categoryId } = newImage;
  const categoryRef = database.ref(`categories/${categoryId}/images`);
  const categoryFirebase = await categoryRef.push({
    title: title,
    desc: desc || "",
    dataImg: dataImg || "",
    categoryId: categoryId,
    authorId: authorId
  });

  return categoryFirebase;

}


/**
 * getCategories function
 * @returns : The array object with all categories on firebase database
 */
async function getCategories() {
  const categoryRef = database.ref('categories');
  let categoriesCollection: any[];
  categoriesCollection = [];

  await categoryRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      categoriesCollection.push({ id: childSnapshot.key, ...childData });
    });
  });
  return categoriesCollection;

}


/**
 * getCategoryInfo function
 * @param id : The category id
 * @returns : The object with all data informations about a specific categories from database
 */
async function getCategoryInfo(id: string) {
  const categoryRef = database.ref('categories');
  let category = {};

  const query = await categoryRef.child(id).once("value")
    .then(function (snapshot) {
      category = snapshot.val();
    });

  return category;

}


export { pushCategory, pushImage, getCategories, getCategoryInfo }