import App from '../../App/App';
import { HeaderProps } from '../../Components/AppHeader/AppHeader';

type HeroNavBarProps = {
    headerProps?: HeaderProps;
    heroBody: React.ReactNode;
    children: React.ReactNode;
};

export function HeroNavBar(props: HeroNavBarProps): JSX.Element {
    const headerColor = props.headerProps?.colorType ?? '';

    return (
        <>
            <App headerProps={props.headerProps}>
                <section
                    className={`hero is-fullheight-with-navbar ${headerColor}`}
                >
                    <div className='hero-body'>{props.heroBody}</div>
                </section>
                {props.children}
            </App>
        </>
    );
}
