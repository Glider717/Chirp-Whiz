import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import config from './aws-exports'

API.configure(config);
PubSub.configure(config);

async function createNewTodo(newBird) {
    const todo = {
        name: newBird.birdName,
        image: newBird.birdImage,
        sound: newBird.birdSound,
        habitatImage: newBird.habitatImage,
        habitatSound: newBird.habitatSound  
    }

    window.location.reload(false);

    await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

function BirdForm() {
    const [newBird, setNewBird] = useState({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    });

    function fillingForm(e) {
        const name = e.target.name;
        let tempBird = newBird;
        tempBird[name] = e.target.value;

        setNewBird(tempBird);
    }

    return(
        <div>
            <h1>Bird Form</h1>
            <form>
                <label>
                    Name of bird:
                    <input name="birdName" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Image of bird:
                    <input name="birdImage" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Sound clip of bird:
                    <input name="birdSound" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Habitat image of bird:
                    <input name="habitatImage" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Habitat sound of bird:
                    <input name="habitatSound" type="text" onChange={fillingForm}/>
                </label><br />
            </form>
            <button onClick={() => createNewTodo(newBird)}>Add Bird</button>
        </div>
    );
}

export default BirdForm;