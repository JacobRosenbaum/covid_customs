import nurse from '../assets/images/nurse.png';
import socialDistance from '../assets/images/socialDistance.png';
import essentialWorker from '../assets/images/essentialWorker.png';
import washHands from '../assets/images/washHands.png';
import wearMask from '../assets/images/wearMask.png';
import '../assets/css/notfound.css';
import Navbar from './Navbar';


function NotFound() {

    function getRandomNumber() {
        const randomNumber: number = Math.floor(Math.random() * Math.floor(5) + 1);

        switch (randomNumber) {
            case 1:
                return (<>
                    <div className="card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Thank You Health Care Works!</h2>
                            <p className="card-text">Thank you nurses, doctors, and other health care works
                            for all your hard work duting the pandemic. We don't know what we would do without you!</p>
                        </div>
                        <div className="img-box"><img src={nurse} className="card-img-top" alt="image of a nurse" /></div>
                    </div>
                </>);
            case 2:
                return (<>
                    <div className="card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Thank You Essential Works!</h2>
                            <p className="card-text">Thank you to all essential workers that kept working hard throughout the pandamic.
                            Thank you for putting yourself at risk to make sure we can still get the nessessities.</p>
                        </div>
                        <div className="img-box"><img src={essentialWorker} className="card-img-top" alt="image of an essential worker" /></div>
                    </div>
                </>);
            case 3:
                return (<>
                    <div className="card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Please Wear Your Masks!</h2>
                            <p className="card-text">Help save lives by wearing a mask. I know that at times wereing a mask can be difficult, but image the live we can save through wearing a mask.
                            Wearing a mask is not a political statement.</p>
                        </div>
                        <div className="img-box"><img src={wearMask} className="card-img-top" alt="image of wearing a mask" /></div>
                    </div>
                </>);
            case 4:
                return (<>
                    <div className="card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Wash Your Hands!</h2>
                            <p className="card-text">Do you best to protect yourself from covid. Make sure you wash you hands thouroughly throught the day.
                            Use soap and and scrub you hand continuously for 20 sec before rincing. </p>
                        </div>
                        <div className="img-box"><img src={washHands} className="card-img-top" alt="image of washing hands" /></div>
                    </div>
                </>);
            case 5:
                return (<>
                    <div className="card m-2" >
                        <div className="card-body">
                            <h2 className="card-title">Social Distance</h2>
                            <p className="card-text">I know that it is hard. But please make sure to social distance whenever
                            possible and avoid social gatherings as much as possible.</p>
                        </div>
                        <div className="img-box"><img src={socialDistance} className="card-img-top" alt="image of social distancing" /></div>
                    </div>
                </>);
        }
    }

    return (
        <>
            <Navbar />
            <br/>
            <div id='notFound' className="container">
                <div className="move_down">
                    <h1 className="h1_special">Page Not Found</h1>
                    {getRandomNumber()}
                </div>
            </div>
        </>
    );
};

export default NotFound;