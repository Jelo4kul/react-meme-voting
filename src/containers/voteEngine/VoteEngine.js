import React, { Component } from 'react';
import MemeCreator from '../../components/MemeCreator/MemeCreator';
import MemeLists from '../../components/MemeLists/MemeLists';
//import { Crypto } from '@aeternity/aepp-sdk/es';
import Ae from '@aeternity/aepp-sdk/es/ae/universal';


class VoteEngine extends Component {

    state = {
        listOfMemes: [{ id: "gj7", name: "James", image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350", aettosAmount: 0, value: "" },
        { id: "vjj8", name: "Gift", image: "https://picsum.photos/id/237/200", aettosAmount: 2, value: "" }],
        newMemeInputs: {
            name: '',
            imageUrl: ''
        }
    }

    componentWillMount() {
        //this.interactWithBlockchain();
    }

    interactWithBlockchain = async () => {

        const contractSource = `
    contract MemeVote = 

    record meme = {
    creatorAddress: address,
    voteCount: int,
    name: string,
    url: string
    }
    
    record state = { 
    memes: map(int, meme),
    memesLength: int
    }

    entrypoint init() = { 
    memes = {},
    memesLength = 0
    }

    entrypoint getMeme(index: int): meme = 
    switch(Map.lookup(index, state.memes))
        None => abort("Index not found")
        Some(y) => y
    
    stateful entrypoint setMeme(memeUrl: string, uname: string) =
    let meme = { creatorAddress = Call.caller, name = uname, url = memeUrl, voteCount = 0}
    let id = getMemesLength() + 1
    put(state { memes[id] = meme, memesLength = id} )
    

    entrypoint getMemesLength(): int =
    state.memesLength
    
    stateful entrypoint voteMeme(index: int) = 
    let meme = getMeme(index)
    Chain.spend(meme.creatorAddress, Call.value)
    let updatedVoteCount = meme.voteCount + Call.value
    let updatedMemes = state.memes{ [index].voteCount = updatedVoteCount }
    put(state { memes = updatedMemes })
    `
        let client = null;

        client = await Ae({
            url: 'https://sdk-testnet.aepps.com', 
            internalUrl: 'https://sdk-testnet.aepps.com',
            keypair: {secretKey: "ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG", publicKey: "ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG"},
            networkId: 'ae_uat'
        });
        //client = await Ae.Aepp();


        //const contractAddress = 'ct_2cMdAVT6HyxZhFsvYvojxrDuMnvuPGLhEPPq65HEcuPoUi7JDE';
        const contractAddress = 'ct_2bNtx4F9CbxEH2LFnWqR7ggTwKTrdTGKLBmVhrh6H6jKKw9T6z';

        //const height = await client.height();
        const contract = await client.getContractInstance(contractSource, { contractAddress });
        const calledGet = await contract.call('getMemesLength', [], { callStatic: true }).catch((error) => console.log(error));
        console.log('calledGet', calledGet);

        const decodeGet = await calledGet.decode().catch(err => console.log(err));
        console.log('decodeGet', decodeGet);
        console.log(client);
    };

    voteHandler = (memeId) => {

        this.setState((prevState, props) => {

            const newListOfMemes = [
                ...prevState.listOfMemes
            ]

            const memeIndex = newListOfMemes.findIndex(({ id }) => id === memeId);

            let newMeme = {
                ...newListOfMemes[memeIndex]
            }

            newMeme.aettosAmount = prevState.listOfMemes[memeIndex].aettosAmount + prevState.listOfMemes[memeIndex].value;

            newListOfMemes[memeIndex] = newMeme;

            return {
                listOfMemes: newListOfMemes
            };
        });
    };

    onChangeHandler = (memeId, event) => {

        const newListOfMemes = [
            ...this.state.listOfMemes
        ]

        const memeIndex = newListOfMemes.findIndex(({ id }) => id === memeId);

        let newMeme = {
            ...newListOfMemes[memeIndex]
        }

        newMeme.value = +event.target.value;

        newListOfMemes[memeIndex] = newMeme;

        this.setState({ listOfMemes: newListOfMemes });

    };

    newNameHandler = (event) => {

        const updatedInputs = {
            ...this.state.newMemeInputs
        }
        updatedInputs.name = event.target.value;

        this.setState({ newMemeInputs: updatedInputs });
    };

    newUrlHandler = (event) => {

        const updatedInputs = {
            ...this.state.newMemeInputs
        }
        updatedInputs.imageUrl = event.target.value;

        this.setState({ newMemeInputs: updatedInputs });
    };

    createMemeHandler = () => {

        if (!this.state.newMemeInputs.imageUrl && !this.state.newMemeInputs.name) {
            return;
        }

        const newListOfMemes = [
            ...this.state.listOfMemes
        ];

        const meme = {
            id: this.state.newMemeInputs.name + ((Math.random() * 100) + 1),
            name: this.state.newMemeInputs.name,
            image: this.state.newMemeInputs.imageUrl,
            aettosAmount: 0,
            value: ""
        }

        newListOfMemes.push(meme);
        this.setState({ listOfMemes: newListOfMemes });
    };

    render() {

        return (
            <div>
                <MemeCreator
                    value={this.state.newMemeInputs}
                    createMemeClicked={this.createMemeHandler}
                    urlChanged={this.newUrlHandler}
                    nameChanged={this.newNameHandler} />
                <MemeLists
                    listOfMemes={this.state.listOfMemes}
                    inputChanged={this.onChangeHandler}
                    voteClicked={this.voteHandler} />
            </div>
        );
    }
}

export default VoteEngine;