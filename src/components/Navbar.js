import React, {useState} from 'react'
import styles from "./Navbar.module.css"
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Popup from './Popup';

const Navbar = () => {

    let [popUp, setpopUp] = useState(false)

    return (
        <nav className={styles.nav}>
            <div className={styles.namelogo}>
                <h2>BombShelves</h2>
                {/* <img src={require("./images/BombShelves1.png")} height={40} width={170} alt=''/> */}
            </div>
            <div className={styles.searchbar}>
                <form action="">
                    <input type="text" placeholder='Search BombShelves.com' name='q' />
                    <div className={styles.searchicon}><SearchIcon/></div>
                </form>
            </div>
            <div className={styles.navlinks}>
                <ul>
                    <li><button onClick={()=> setpopUp(true)}><p>Account</p> <p>Sign In/Up</p></button></li>
                    <li><a href="/">Orders</a></li>
                </ul>
            </div>
            <div className={styles.address}>
                <div className={styles.locationicon}><LocationOnOutlinedIcon/></div>
                <a href="/"><p>Select your location</p></a>
            </div>
            <div className={styles.cart}>
                <div className={styles.carticon}><AddShoppingCartIcon/></div>
                <a href="/"><p>Cart</p></a>
            </div>

            <Popup trigger={popUp} closetrigger={setpopUp}/>
        </nav> 
    )
}

export default Navbar
