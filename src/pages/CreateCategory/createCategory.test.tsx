import { render, screen  } from "@testing-library/react";
import '@testing-library/jest-dom'
import { CreateCategory } from '.';

/** create mock navigate react-router-dom */
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


/** Describe Unit Tests to Module Page: Create Category */
describe("CreateCategory Test Case", () => {

    // verify if page and main elements have been loaded
    test("The page should show the input category name to user", async () => {
        // render the createButton page
        render(<CreateCategory />);

        const inputTitle = await screen.findByPlaceholderText("Category Name");
        expect(inputTitle).toBeInTheDocument();
    });

    test("The page should show the input image description to user", async () => {
        // render the CreateCategory page
        render(<CreateCategory />);

        const inputDesc = await screen.findByPlaceholderText("Category Description");
        expect(inputDesc).toBeInTheDocument();
    });

    test("The FileUploader component should be loaded", async () => {
        // render the CreateCategory page
        render(<CreateCategory />);

        const fileUploader = await screen.findByTitle("File Uploader");
        expect(fileUploader).toBeInTheDocument();
    });

    
})
