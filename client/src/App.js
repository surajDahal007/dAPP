import './App.css';
import {useEffect,useState} from "react";
import { ethers } from "ethers";
import abi from "./contracts/chai.json";
import Buy from './components/Buy';
import Memos from './components/Memos';

function App() {
      const [state,setState]= useState({
        provider: null,
        signer: null,
        contract: null
      })

      const [account,setAccount]= useState("None");

      useEffect(() => {
        const connectWallet = async ()=>{
          const contractAddress= "0x54eec8e20e8bed0f057d92f7602b17dd3be781e6";
          const contractABI = abi.abi;

          try{
            const {ethereum}= window;

            if(ethereum){
              const account= await ethereum.request({
                method:"eth_requestAccounts",
              });

              window.ethereum.on("chainChanged",()=>{
                window.location.reload();
              })

              window.ethereum.on("accountsChanged",()=>{
                window.location.reload();
              })
            

            const provider= new ethers.providers.Web3Provider(ethereum);
            const signer= provider.getSigner();
            const contract = new ethers.Contract(
              contractAddress,contractABI,signer
              );
            setAccount(account)
            setState({provider,signer,contract})   
          }else{
            alert("Please install Metamask");
          }

          }catch(error){
            console.log(error);
          }
        };
        connectWallet(); 
      },[]);

      // console.log(state);

      return (
        
      <div className="App">
        <p className='account'><b>Connected Account <br />
         {account} </b></p>
         <div className='main'>
        <Buy state={state}></Buy>
        <Memos state={state}></Memos>
        </div>
      </div>
      )
}

export default App;
