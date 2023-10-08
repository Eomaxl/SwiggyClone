const Title = () =>(
    <a href="/">
    <img
        className="logo"
        alt="logo"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/8cb220fa3997a3b928d2ffb6c098acaf"
    />
    </a>
);

const Header = () => {
    return (
        <div className="header">
            <Title/>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;