import { useAppState, useAppStateDispatch } from '../AppContext/AppContext';
import { NavLink } from 'react-router-dom';
import {
    aboutHref,
    contactHref,
    DocsHref,
    homeHref,
    reportHref,
    signInHref,
    signUpHref,
} from '../../AppRoute/AppRoute';

export type HeaderProps = {
    colorType?: string;
};

export function AppHeader(props?: HeaderProps): JSX.Element {
    const appState = useAppState();
    const AppStateDispatch = useAppStateDispatch();

    const clickBurger = (): void => {
        AppStateDispatch({ type: 'toggleActiveBurger' });
    };

    const toggledClassName = (defaultClassName: string): string => {
        return `${defaultClassName} ${
            appState.isActiveBurger ? 'is-active' : ''
        }`;
    };

    return (
        <>
            <nav
                className={`navbar ${props?.colorType}`}
                role='navigation'
                aria-label='main navigation'
            >
                <div className='navbar-brand'>
                    <NavLink exact to={homeHref} className='navbar-item'>
                        <img
                            alt=''
                            src={
                                process.env.PUBLIC_URL + '/image/worldwide.svg'
                            }
                            width='112'
                            height='28'
                        />
                    </NavLink>
                    <div
                        role='button'
                        className={toggledClassName('navbar-burger')}
                        aria-label='menu'
                        aria-expanded='false'
                        data-target='navbarBasicExample'
                        onClick={clickBurger}
                    >
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </div>
                </div>

                <div
                    id='navbarBasicExample'
                    className={toggledClassName('navbar-menu')}
                >
                    <div className='navbar-start'>
                        <NavLink exact to={homeHref} className='navbar-item'>
                            Home
                        </NavLink>
                        <a href={DocsHref} className='navbar-item'>
                            Documentation
                        </a>
                        <div className='navbar-item has-dropdown is-hoverable'>
                            <div className='navbar-link'>More</div>
                            <div className='navbar-dropdown'>
                                <NavLink
                                    exact
                                    to={aboutHref}
                                    className='navbar-item'
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    exact
                                    to={contactHref}
                                    className='navbar-item'
                                >
                                    Contact
                                </NavLink>
                                <hr className='navbar-divider' />
                                <NavLink
                                    exact
                                    to={reportHref}
                                    className='navbar-item'
                                >
                                    Report an issue
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='navbar-end'>
                        <div className='navbar-item'>
                            <div className='buttons'>
                                <a
                                    href={signUpHref}
                                    className='button is-primary'
                                >
                                    <strong>Sign up</strong>
                                </a>
                                <a
                                    href={signInHref}
                                    className='button is-light'
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
