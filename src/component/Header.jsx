import React from "react";
import "./css/Header.css";

export default function Header() {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <h1 className="logo">Meme-Generator</h1>
                <div className="underline"></div>
            </div>
            <h2 className="nav-tagline">Build with ❤️ by Spriha</h2>
        </nav>
    );
}
