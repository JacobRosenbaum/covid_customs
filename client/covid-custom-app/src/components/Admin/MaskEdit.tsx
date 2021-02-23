import React, { useState, useEffect, useContext } from 'react';
import AdminControls from "./AdminControls";
import Errors from '../../components/Errors';
import { Link, useHistory, useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { Color, Mask } from '../Interfaces';

const DEFAULT_COLOR: Color = {
    red: false,
    orange: false,
    blue: false,
    white: false,
    black: false,
    green: false,
    violet: false
};

const DEFAULT_MASK: Mask = {
    maskId: 0,
    material: "COTTON",
    style: "OVER_EAR",
    colors: [],
    cost: 0,
    image: "/images/mask_black_polycot_ear.png",
    custom: false,
    deleted: false
};


function MaskEdit() {
    const auth = useContext(AuthContext);
    const { maskId }: any = useParams();
    const history = useHistory();

    const [mask, setMask] = useState(DEFAULT_MASK);
    const [errors, setErrors] = useState([] as String[]);
    const [colors, setColors] = useState(DEFAULT_COLOR);

    useEffect(() => {
        fetch(`http://localhost:8080/api/mask/${maskId}`)
            .then(response => response.json())
            .then(data => setMask(data))
            .catch(error => console.log(error));
    }, [maskId]);

    useEffect(() => {
        setColors(setStartingColors());
    }, [mask.maskId]);


    const switchColorsAddToObject = (color: String, colorStart: Color) => {
        switch (color) {
            case "RED":
                colorStart.red = !colorStart.red;
                break;
            case "ORANGE":
                colorStart.orange = !colorStart.orange;
                break;
            case "GREEN":
                colorStart.green = !colorStart.green;
                break;
            case "BLUE":
                colorStart.blue = !colorStart.blue;
                break;
            case "WHITE":
                colorStart.white = !colorStart.white;
                break;
            case "BLACK":
                colorStart.black = !colorStart.black;
                break;
            case "VIOLET":
                colorStart.violet = !colorStart.violet;
                break;
        };
    };

    const setStartingColors = () => {
        const colorStart: Color = {
            red: false,
            orange: false,
            blue: false,
            white: false,
            black: false,
            green: false,
            violet: false
        };
        for (let color of mask.colors) {
            switchColorsAddToObject(color, colorStart);
        };
        return colorStart;
    }

    const handlingFormSubmit = (e: any) => {
        e.preventDefault();
        const newMask: Mask = mask;

        const body = JSON.stringify(newMask);

        fetch(`http://localhost:8080/api/mask/${newMask.maskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`
            },
            body
        })
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    Promise.reject('Something went wrong!');
                }
            })
            .then(data => {
                if (!data) {
                    history.push('/admin/masks');
                } else {
                    setErrors(data);
                }
            })
            .catch(error => console.log(error));
    };

    const handleCheckBox = (e: any) => {
        const colorStart: any = { ...colors };
        switchColorsAddToObject(e.target.value, colorStart);
        setColors(colorStart);
        const colorsArray: String[] = [];
        Object.keys(colorStart).map(color => colorStart[color] ? colorsArray.push(color.toLocaleUpperCase()) : console.log())
        const updatedMask: Mask = { ...mask };
        updatedMask.colors = colorsArray;
        setMask(updatedMask);
    };

    const handleCheckBoxDeleted = () => {
        const updatedMask: Mask = { ...mask };
        updatedMask.deleted = !updatedMask.deleted;
        setMask(updatedMask);
    };

    const handlingOnChange = (e: any) => {
        const updatedMask: any = { ...mask };
        updatedMask[e.target.name] = e.target.value;
        setMask(updatedMask);
    };

    return (
        <>
            <AdminControls />
            <div className="container">
                <br /><br /><br />
                <h1>Welcome Admin</h1>
                <Errors errors={errors} />
                <form onSubmit={handlingFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="material" className="form-label">Material</label>
                        <select value={mask.material} onChange={handlingOnChange} id="material" name="material" className="form-select" aria-label="Default select example">
                            <option value="POLY_COT">Polyester and Cotton</option>
                            <option value="POLYESTER">Polyester</option>
                            <option value="COTTON">Cotton</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="style" className="form-label">Style</label>
                        <select value={mask.style} onChange={handlingOnChange} id="style" name="style" className="form-select" aria-label="Default select example">
                            <option value="OVER_EAR">Over Ear</option>
                            <option value="ATHLETIC">Athletic</option>
                            <option value="WRAP">Wrap</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="RED" id="red" name="red" checked={colors.red} />
                            <label className="form-check-label" htmlFor="red">
                                Red
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="ORANGE" id="orange" name="orange" checked={colors.orange} />
                            <label className="form-check-label" htmlFor="orange">
                                Orange
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="BLUE" id="blue" name="blue" checked={colors.blue} />
                            <label className="form-check-label" htmlFor="blue">
                                Blue
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="VIOLET" id="violet" name="violet" checked={colors.violet} />
                            <label className="form-check-label" htmlFor="violet">
                                Violet
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="WHITE" id="white" name="white" checked={colors.white} />
                            <label className="form-check-label" htmlFor="white">
                                White
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="BLACK" id="black" name="black" checked={colors.black} />
                            <label className="form-check-label" htmlFor="black">
                                Black
                        </label>
                        </div>
                        <div className="form-check">
                            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" value="GREEN" id="green" name="green" checked={colors.green} />
                            <label className="form-check-label" htmlFor="green">
                                Green
                        </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input id="image" name="image" type="text" className="form-control"
                            onChange={handlingOnChange}
                            value={mask.image}></input>
                    </div>
                    <div className="form-check">
                        <input onChange={handleCheckBoxDeleted} className="form-check-input" type="checkbox" id="deleted" name="deleted" checked={mask.deleted} />
                        <label className="form-check-label" htmlFor="deleted">
                            Discontinued or Unavaliable
                        </label>
                    </div>

                    <button className="btn btn-success" type="submit">Edit</button>
                    <Link className="btn btn-warning ml-2" to="/admin/masks">Cancel</Link>
                </form>
            </div>
        </>
    );
};

export default MaskEdit;