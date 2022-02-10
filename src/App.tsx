import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const JOKE_PRICE = 10;
const BANANA_2003 = 0.50;
// converting from 118 grams to pounds
const SINGLE_BANANA_WEIGHT = 0.260145;
const BLS_BANANA_PER_LB_ENDPOINT = "https://api.bls.gov/publicAPI/v1/timeseries/data/APU0000711211"


function App() {

    const [percent, setPercent] = useState('0');

    let add_banana_eq = () => {
        const equation = (current_price: number): number => {
            console.log(current_price);
            return (JOKE_PRICE - (current_price * SINGLE_BANANA_WEIGHT)) / (JOKE_PRICE - (BANANA_2003 * SINGLE_BANANA_WEIGHT));
        }
        fetch(BLS_BANANA_PER_LB_ENDPOINT).then((r) =>
            r.json().then((r) => {
                    let price = r["Results"]["series"][0]["data"][0]["value"];
                    setPercent((equation(price)*100).toFixed(4));
                }
            )
        );
    };

    useEffect(add_banana_eq);

    return (
        <div className="m-4">
            <h2>I mean it's one Banana Michael, what could it cost... <b>$10?</b></h2>
            <p>This website was a small experiment I thought of one day during the period of high inflation
                <a href="https://www.nytimes.com/2021/10/22/business/shortages-supply-chain.html"> during the pandemic
                    supply chain crunch in 2021-2022.</a>
                I thought about the math behind how this joke is getting "less funny" with each passing year and
                wondered how
                I could quantify it. I ended up on this equation:
                <img src="https://latex.codecogs.com/svg.image?\frac{\$10-B_{current\&space;year}}{\$10-B_{2003}}"
                     title="{LateX equation could not render :(\"/>.
                In other words the amount of "punch" the original joke had (based on the difference) of a 2003 CPI
                banana vs a current year
                banana.
            </p>
            <p>drum roll please....</p>
            <div className="container text-center">
                <h1>The joke is {percent}% as funny as it used to be</h1>
            </div>
            <img src="https://pyxis.nymag.com/v1/imgs/7f8/34f/d2574f13c7fcafb9b2d16897008caf7edd-lucille-bluth.2x.rhorizontal.w700.jpg" className="mx-auto d-block"/>
            <h3>Limitations</h3>
            <p>The BLS Api only allows for 25 queries per day, if it is showing 0% you most likely have used all of
            the api requests from your IP address up for the day.</p>
        </div>
    );
}

export default App;
