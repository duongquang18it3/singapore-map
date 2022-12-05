import { HeaderProps } from '../../Components/AppHeader/AppHeader';
import { HeroNavBar } from '../Templates/HeroNavBar';

export function Contact(): JSX.Element {
    const herroProps: HeaderProps = {
        colorType: 'is-info',
    };

    const body: JSX.Element = (
        <div className=''>
            <p className='title'>Contact</p>
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
                headerProps={herroProps}
                heroBody={body}
                children={undefined}
            />
        </>
    );
}
