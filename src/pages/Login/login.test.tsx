import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Login } from '.';

/** create mock navigate react-router-dom */
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


/** Describe Unit Tests to Module Page: Login */
describe("Login Test Case", ()=> {

    // verify if Login page has been loaded
    test("The Login page should be successfully loaded", async() => {
        render(<Login />);
        const loginPage = await screen.findByTitle('Webgallery Login Page');                    
        expect(loginPage).toBeInTheDocument();
    });    

    // verify if user auth element has been loaded
    test("The user auth should be successfully loaded", async() => {
        // render the Login page
        const { container } = render(<Login />);

        // verify if user auth element has been loaded
        const userAuth = container.getElementsByClassName('user-auth'); 
        expect(userAuth.length).toBe(1);

    });    
    test("The lateral aside panel should be loaded", async() => {
        // render the Login page
        const { container } = render(<Login />);

        // verify if aside panel has been loaded
        const asidePanel = container.getElementsByClassName('aside-panel'); 
        expect(asidePanel.length).toBe(1);
    });
    test("The google login button should be loaded", async() => {
        // render the Login page
        const { container } = render(<Login />);

        // verify if google button has been loaded
        const googleLoginButton = container.getElementsByClassName('google-login-button'); 
        expect(googleLoginButton.length).toBe(1);
    });
    test("The google icon should be loaded", async() => {
        // render the Login page
        render(<Login />);

        // verify if google ico has been loaded
        const googleIcon = screen.getByAltText('Google logo icon');
        expect(googleIcon).toBeInTheDocument();        
    });
})