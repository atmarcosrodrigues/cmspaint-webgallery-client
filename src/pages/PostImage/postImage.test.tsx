import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { PostImage } from '../PostImage';


/** Describe Unit Tests to Module Page: PostImage */
describe("PostImage Test Case", () => {

    // verify if page and main elements have been loaded
    test("The page should show the input image title to user", async () => {
        // render the PostImage page
        render(<PostImage />);

        const inputTitle = await screen.findByPlaceholderText("Image Title");
        expect(inputTitle).toBeInTheDocument();
    });

    test("The page should show the input image description to user", async () => {
        // render the PostImage page
        render(<PostImage />);

        const inputDesc = await screen.findByPlaceholderText("Image Description");
        expect(inputDesc).toBeInTheDocument();
    });

    test("The FileUploader component should be loaded", async () => {
        // render the PostImage page
        render(<PostImage />);

        const fileUploader = await screen.findByTitle("File Uploader");
        expect(fileUploader).toBeInTheDocument();
    });

    test("Create image with empty title sould show an error message", async () => {
        // render the PostImage page
        const { container } = render(<PostImage />);

        // when starting there should be no error message
        let infoMessage = container.getElementsByClassName('info-messsage')[0];
        expect(infoMessage.innerHTML).toEqual("");

        // select the button create image and fire a event click
        const createButton = container.getElementsByClassName('create-button')[0];
        fireEvent.click(createButton);

        // after click on create button there should be a message information about the error
        infoMessage = container.getElementsByClassName('info-messsage')[0];
        expect(infoMessage.innerHTML).toEqual("The image title cannot be empty.");

    });

})
