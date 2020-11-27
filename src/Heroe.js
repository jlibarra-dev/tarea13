import './Heroe.css';
import { useState, useEffect } from "react";
import React from "react";
var md5 = require('md5');

let publicKey = "3175153b3af29becadf8945d73276842";
let privateKey = "3e603c4890ad2ba60235250b171d56a1bd1f80a7";

function Heroe() {
    let [heroes, setHeroes] = useState([]);

    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("heroes") === null) {
                setHeroes("Loading...")
            } else {
                setHeroes(localStorage.getItem("heroes"));
            }
        } else {
            const url = new URL("https://gateway.marvel.com/v1/public/characters?");
            let ts = "heroes";
            let data = {
                "ts": ts,
                "hash": md5(ts + privateKey + publicKey),
                "apikey": publicKey
            };
            url.search = new URLSearchParams(data);
            console.log(data.hash);
            fetch(url).then(res => res.json()).then(res => {
                setHeroes(res.data.results);
                localStorage.setItem("heroes", res.data.results);
            })
        }
    }, []);

    console.log(heroes);
    return (
        <div>
            {heroes.map(h => <div key={h.name} className="heroe">
                <h3>{h.name}:</h3>
                <h4>Descripcion: {h.description}</h4>
                <ul key="comic">Comics:
                {h.comics.items.map(c => <li key={"comic" + c.name + h.name}>{c.name}</li>)}
                </ul>
                <ul key="events">Eventos:
                {h.events.items.map(e => <li key={"event" + e.name + h.name}>{e.name}</li>)}
                </ul>
                <ul key="series">Series:
                {h.series.items.map(s => <li key={"serie" + s.name + h.name}>{s.name}</li>)}
                </ul>
                <ul key="stories">Historias:
                {h.stories.items.map(s => <li key={"storie" + s.name + h.name + s.resourceURI}>{s.name}</li>)}
                </ul>
                <hr></hr>
            </div>

            )}
        </div>
    );
}

export default Heroe;
