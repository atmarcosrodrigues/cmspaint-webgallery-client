
let authMock = {};

//load environment mode
const environment_mode = process.env.NODE_ENV;

if (environment_mode === 'test'){
    // create mock auth object
    const authObjectMock = {
        createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
        sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
        signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
        fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
        signOut: jest.fn(() => {
            Promise.resolve(true);
        }),
        onAuthStateChanged: jest.fn(),
        currentUser: {
            sendEmailVerification: jest.fn(() => Promise.resolve(true)),
        },
    };

    authMock = jest.fn(() => authObjectMock);
}

export { authMock };


