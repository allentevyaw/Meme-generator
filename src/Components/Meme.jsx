import React, {useState, useEffect} from "react";

export const Meme = () => {

    const [meme, setMeme] = useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setMemeArray] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeArray(data.data.memes))

    }, [])


    function buttonClick(){
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url =memesArray[randomNumber].url

        setMeme(prevArray => ({
            ...prevArray,
            randomImage: url
    }))

} 

    function onChange(event){
        const {name, value} = event.target
        setMeme(prevArray => ({
            ...prevArray,
            [name] : value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={onChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom Text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={onChange}
                />
               <button onClick={buttonClick} className="form--button">Generate a new meme!</button>
            </div>
            <br />
            <div className="meme--final">
               <img src={meme.randomImage} className="meme--image"/ >
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}