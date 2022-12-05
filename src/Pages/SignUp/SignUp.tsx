import { HeaderProps } from '../../Components/AppHeader/AppHeader';
import { HeroNavBar } from '../Templates/HeroNavBar';

export function SignUp(): JSX.Element {
    const headerProps: HeaderProps = {
        colorType: 'is-link',
    };

    const body: JSX.Element = (
        <div className=''>
            <p className='title'>SignUp</p>
            <p className='subtitle'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    );

    return (
        <>
            <HeroNavBar
                headerProps={headerProps}
                heroBody={body}
                children={undefined}
            />
        </>
    );
}
