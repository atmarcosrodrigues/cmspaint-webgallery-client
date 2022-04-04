import { useNavigate } from 'react-router-dom';

import asideBackground from '../../assets/images/background.png';
import webGalleryLogo from '../../assets/images/icon-mspaint.png';
import googleIcon from '../../assets/images/google-icon.svg';

import '../../styles/auth.scss';
import { useAuth } from '../../hooks/useAuth';

/**
 * Login Page function: generate a template page with necessary components to user make login on application
 * @returns The html page template
 */
export function Login() {

    const navigate = useNavigate();
    const { user, status, signIn } = useAuth();

    // If user is not logged effect the signIn and go to home page
    async function navigateToHome() {
        if (!user) {
            await signIn();
        }
        navigate('/home');
    }

    // If user is alreadu logged go to home page
    async function verifySignIn() {
        if (user) {
            navigate('/home');
        }
    }
    // on start verify if user is logged
    verifySignIn();

    // return the login page
    return (
        <div id="page-auth" title="Webgallery Login Page">
            <aside className="aside-panel">
                <img src={asideBackground} alt="Ilustration about image gallery" />
                <strong>MSPaint Web Gallery</strong>
                <p>Create your profile to upload and edit your drawings from mspaint application on web Gallery</p>

            </aside>

            <main>
                <div className="main-content user-auth">
                    <img src={webGalleryLogo} alt="Web Gallery logo" width='90px' />

                    <div className="separator-one">  </div>

                    <h5>Make loogin to start on gallery:</h5>

                    <button className="google-login-button" onClick={navigateToHome}>
                        <img src={googleIcon} alt="Google logo icon" />
                        Make login with Google
                    </button>
                </div>
            </main>
        </div>
    )
}