import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { About } from '../Pages/About/About';
import { Contact } from '../Pages/Contact/Contact';
import { Documentation } from '../Pages/Documentation/Documentation';
import { Home } from '../Pages/Home/Home';
import { Report } from '../Pages/Report/Report';
import { SignIn } from '../Pages/SignIn/SignIn';
import { SignUp } from '../Pages/SignUp/SignUp';

export const homeHref = '/';
export const DocsHref = '/Documentation';
export const aboutHref = '/About';
export const contactHref = '/Contact';
export const reportHref = '/Report';
export const signUpHref = '/SignUp';
export const signInHref = '/SignIn';

export function AppRoute(): JSX.Element {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path={homeHref} component={Home} />
                    <Route exact path={DocsHref} component={Documentation} />
                    <Route exact path={aboutHref} component={About} />
                    <Route exact path={contactHref} component={Contact} />
                    <Route exact path={reportHref} component={Report} />
                    <Route exact path={signUpHref} component={SignUp} />
                    <Route exact path={signInHref} component={SignIn} />
                </Switch>
            </BrowserRouter>
        </>
    );
}
