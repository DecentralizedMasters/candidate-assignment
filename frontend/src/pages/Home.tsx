import CustomWidget from "../components/CustomWidgets"
import ethereumIcon from '../assets/etherium.png';

const Home = () => {
    return (
        <div className='container-full'>
            <h1>Welcome to the Home Page <img src={ethereumIcon} alt="Ethereum" className="ethereum-icon" /></h1>
            <CustomWidget />
        </div>
    )
}

export default Home
