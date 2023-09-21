import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm'


document.addEventListener("DOMContentLoaded", function() {
    const characterList = document.getElementById("character-list")
    const buttonRNG = document.getElementById("button-RNG")
    const portrait = document.getElementById("character-portrait")


    function loadCharacterData(characterId) { // character Id to change ${}
        const url = `https://swapi.dev/api/people/${characterId}`
        axios.get(url)
            .then(response => {
                const character = response.data
                console.log(character)
                displayCharacter(character)
                setPortraitImage(characterId)
            })
            .catch(error => {
                console.error('An error occurred while loading the data.', error) 
            })
    }

    function displayCharacter(character) {
        characterList.innerHTML = ``
        const characterDiv = document.createElement('div')
        characterDiv.classList.add('character-card')
        characterDiv.innerHTML = `
            <h2 id="character-name">${character.name}</h2>
            <p class="character-height"><span style="font-weight: bold;">Height:</span> ${character.height}cm</p>
            <p class="character-mass"><span style="font-weight: bold;">Mass:</span> ${character.mass}kg</p>
            <p class="character-hair"><span style="font-weight: bold;">Hair Color:</span> ${character.hair_color}</p>
            <p class="character-skin"><span style="font-weight: bold;">Skin Color:</span> ${character.skin_color}</p>
            <p class="character-eye"><span style="font-weight: bold;">Eye Color:</span> ${character.eye_color}</p>
            <p class="character-dob"><span style="font-weight: bold;">Birth Year:</span> ${character.birth_year}</p>
            <p class="character-gender"><span style="font-weight: bold;">Gender:</span> ${character.gender}</p>
        `
            //<p>Appears in episode(s): ${character.episodes}</p>
        // Might have to remove episode(s) or find a way around it
        characterList.appendChild(characterDiv)
    }

    function setPortraitImage(characterId) {
        portrait.src = `characters/${characterId}.jpg`
    }

    buttonRNG.addEventListener("click", function() {
        let characterId = Math.floor(Math.random() * 83) + 1
        loadCharacterData(characterId)
    })
})