import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { CategoryPage } from '.';

/** create mock navigate react-router-dom */
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


/** Describe Unit Tests to Module Page: CategoryPage */
describe("CategoryPage Test Case", ()=> {
    
    // verify if CategoryPage has been loaded
    test("The CategoryPage should be successfully loaded", async() => {
        render(<CategoryPage />);
        const homePage = await screen.findByTitle('Webgallery App');                    
        expect(homePage).toBeInTheDocument();
    });    

    // verify if header component has been loaded
    test("The Header component should be loaded", async() => {
        render(<CategoryPage />);
        const headComponent = await screen.findByAltText('WebGallery header Logo');                    
        expect(headComponent).toBeInTheDocument();
    });    
       
    // verify if user information elements has been loaded
    test("The user info should be successfully loaded", async () => {
        const { container } = render(<CategoryPage />);
        const userInfo = container.getElementsByClassName('user-info'); 
        
        expect(userInfo.length).toBe(1);
       
    });    

    // verify if list images from category has been loaded on mode categories
    test("The panel list images should be loaded", async () => {        
        const { container } = render(<CategoryPage />);        
        const listImages = container.getElementsByClassName('list-images');         
        
        // verify panel list images has the element
        expect(listImages.length).toBe(1);
    });    
    
})
