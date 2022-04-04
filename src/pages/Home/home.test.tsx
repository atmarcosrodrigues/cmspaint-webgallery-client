import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Home } from '.';

/** create mock navigate react-router-dom */
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


/** Describe Unit Tests to Module Page: Home */
describe("Home Test Case", () => {

    // verify if Home page has been loaded
    test("The Homepage should be successfully loaded", async () => {
        render(<Home />);
        const homePage = await screen.findByTitle('Webgallery App');
        expect(homePage).toBeInTheDocument();
    });

    // verify if header component has been loaded
    test("The Header component should be loaded", async () => {
        render(<Home />);
        const headComponent = await screen.findByAltText('WebGallery header Logo');
        expect(headComponent).toBeInTheDocument();
    });


    // verify if user information elements has been loaded
    test("The user info should be successfully loaded", async () => {
        const { container } = render(<Home />);
        const userInfo = container.getElementsByClassName('user-info');

        expect(userInfo.length).toBe(1);

    });

    // verify if page mode buttons has been loaded
    test("The categories/my drawings buttons should be successfully loaded", async () => {
        render(<Home />);
        const categoriesButton = await screen.findByTitle('Image Categories Button');
        const myDrawingsButton = await screen.findByTitle('My Drawings Button');

        expect(categoriesButton).toBeInTheDocument();
        expect(myDrawingsButton).toBeInTheDocument();
    });

    // verify if page has been loaded on mode categories
    test("The panel list images should be in mode Image Categories on start", async () => {
        const { container } = render(<Home />);
        const panelSelected = container.getElementsByClassName('panel-list-images');

        // verify panel list images is equal Image Categories
        expect(panelSelected[0].innerHTML).toEqual("Image Categories");
    });

    // verify if on click my drawings button the panel change
    test("The image list panel should change on clink my drawings button", async () => {
        //render(<Home />);
        const { container } = render(<Home />);
        const buttonsScreenMode = container.getElementsByClassName('button-panel-select');

        // get the screenmode buttons
        const myDrawingsButton = buttonsScreenMode[1];

        // select the list images panel
        let panelSelected = container.getElementsByClassName('panel-list-images');
        // verify panel list images is equal Image Categories        
        expect(panelSelected[0].innerHTML).toEqual("Image Categories");

        // make a click event on myDrawingsButton
        fireEvent.click(myDrawingsButton);

        // select the list images panel
        panelSelected = container.getElementsByClassName('panel-list-images');
        // verify if panel list change to mode My Drawings
        expect(panelSelected[0].innerHTML).toEqual("My Drawings");

    });


    // verify if user can switch between panels
    test("The image list panel should change on clink buttons screen mode", async () => {
        //render(<Home />);
        const { container } = render(<Home />);
        const buttonsScreenMode = container.getElementsByClassName('button-panel-select');

        // get the screenmode buttons
        const categoriesButton = buttonsScreenMode[0];
        const myDrawingsButton = buttonsScreenMode[1];

        // select the list images panel
        let panelSelected = container.getElementsByClassName('panel-list-images');

        // make a click event on myDrawingsButton
        fireEvent.click(myDrawingsButton);

        // select the list images panel
        panelSelected = container.getElementsByClassName('panel-list-images');
        // verify if panel list change to mode My Drawings
        expect(panelSelected[0].innerHTML).toEqual("My Drawings");


        // make a click event on categoriesButton
        fireEvent.click(categoriesButton);

        // select the list images panel
        panelSelected = container.getElementsByClassName('panel-list-images');
        // verify panel list images is equal Image Categories        
        expect(panelSelected[0].innerHTML).toEqual("Image Categories");

    });
})
