import React, { useState, useEffect } from "react";
import "./css/Meme.css";
import domtoimage from "dom-to-image";

export default function Meme() {
    const [MemeData, setMemeData] = useState("");
    const [formData, setFormData] = useState({
        firsttext: "",
        secondtext: "",
        randomImage: "https://i.imgflip.com/1bhk.jpg",
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setMemeData(data));
    }, []);

    const onChangeText = (event) => {
        const { name, value } = event.target;
        setFormData((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    };

    function clickImage() {
        var node = document.querySelector(".meme-div");

        domtoimage
            .toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                var link = document.createElement("a");
                link.download = "meme-generator.png";
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    }

    const handleClick = () => {
        const memeArray = MemeData.data.memes;
        const randomNumber = Math.floor(Math.random() * memeArray.length);
        const imgsrc = memeArray[randomNumber].url;
        setFormData((preData) => ({
            ...preData,
            randomImage: imgsrc,
        }));
    };

    return (
        <main>
            <div className="form-box">
                <input
                    className="input-box"
                    value={formData.firsttext}
                    name="firsttext"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter top Meme text"
                />
                <input
                    className="input-box"
                    value={formData.secondtext}
                    name="secondtext"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter bottom Meme text"
                />
                <button onClick={handleClick} className="form-btn">
                    Change Meme Image
                </button>
                <button onClick={clickImage} className="form-btn">
                    Download Meme
                </button>
                <div className="meme-div">
                    <h1 className="meme-text toptext">{formData.firsttext}</h1>
                    <h1 className="meme-text bottomtext">{formData.secondtext}</h1>
                    <img
                        className="meme-image"
                        src={formData.randomImage}
                        alt="meme-image"
                    />
                </div>
            </div>
        </main>
    );
}
