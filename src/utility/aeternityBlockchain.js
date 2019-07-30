import Ae from '@aeternity/aepp-sdk/es/ae/universal';

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


const interactWithBlockchain = () => {

    client = Ae.Aepp();

    const contractAddress = 'ct_2cMdAVT6HyxZhFsvYvojxrDuMnvuPGLhEPPq65HEcuPoUi7JDE';

    const contract = client.getContractInstance(contractSource, { contractAddress });
    const calledGet = contract.call('getMemesLength', [], { callStatic: true }).catch((error) => console.log(error));
    console.log('calledGet', calledGet);

    const decodeGet = calledGet.decode().catch(err => console.log(err));
    console.log('decodeGet', decodeGet);
};

export default interactWithBlockchain;

