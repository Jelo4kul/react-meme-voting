import React, { Component } from 'react';
import MemeCreator from '../../components/MemeCreator/MemeCreator';
import MemeLists from '../../components/MemeLists/MemeLists';
import Ae from '@aeternity/aepp-sdk/es/ae/universal';
import ContractSource from '../../assets/MemeVote.aes';


class VoteEngine extends Component {

    state = {
        listOfMemes: [{ id: "gj7", name: "James", image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350", aettosAmount: 0, value: "" },
        { id: "vjj8", name: "Gift", image: "https://picsum.photos/id/237/200", aettosAmount: 2, value: "" }],
        newMemeInputs: {
            name: '',
            imageUrl: ''
        }
    }

    componentDidMount() {
        this.interactWithBlockchain();
    }

    interactWithBlockchain = async () => {

        const contractAddress = 'ct_2bNtx4F9CbxEH2LFnWqR7ggTwKTrdTGKLBmVhrh6H6jKKw9T6z';

        const client = await Ae({
            url: 'https://sdk-testnet.aepps.com',
            internalUrl: 'https://sdk-testnet.aepps.com',
            networkId: 'ae_uat',
            keypair: {
                publicKey: 'ak_SmB9dDDkbs7Y4Lb11oySsyxwmxot6s7dzJaAPEefKwRbTQ551',
                secretKey: 'c7511c7de81142e633f89609c09898486cd02f6cbff7666030bdcb3c0866b7753a7eb5035c83a4a7daf4d4b03558cef548ee882a15d0131fec29382a4eb91f25'
            },
            compilerUrl: "https://compiler.aepps.com",
            nativeMode: true
        })


        fetch(ContractSource)
            .then(response => response.text())
            .then(text => {
                // Logs a string of the contract source content.
                console.log(text);
                return client.getContractInstance(text, { contractAddress })
            })
            .then(contract => {
                console.log(contract.compilerVersion)
                return contract.call('getMemesLength', [], { callStatic: true })
            })
            .then(calledGet => {
                console.log('calledGet', calledGet);
                return calledGet.decode()
            })
            .then(decodeGet => {
                console.log('decodeGet', decodeGet);
            })

        //const contractAddress = 'ct_2cMdAVT6HyxZhFsvYvojxrDuMnvuPGLhEPPq65HEcuPoUi7JDE';

        //const contract = await clients.api.getContract(contractAddress);
        //console.log(contract)
        // const calledGet = await clients.call(contractSource, 'sophia-address', contractAddress, 'getMemesLength', [], { callStatic: true }).catch((error) => console.log(error));
        //const height = await client.height();
        //const contract = await client.getContractInstance(contractSource, { contractAddress });
        //const calledGet = await contract.call('getMemesLength', [], { callStatic: true }).catch((error) => console.log(error));
        //console.log('calledGet', calledGet);

        //const decodeGet = await calledGet.decode().catch(err => console.log(err));
        //console.log('decodeGet', decodeGet);
        //console.log(client);
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
