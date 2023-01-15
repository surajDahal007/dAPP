import { ethers } from "ethers";

const Buy = ({state})=>{

    const buyChai = async(event)=>{
        event.preventDefault();
        const {contract}= state;
        const name= document.querySelector("#name").value;
        const message= document.querySelector("#message").value;
        
        console.log(name,message,contract);

        const amount= {value: ethers.utils.parseEther("0.001")};
        const transaction= await contract.buyChai(name,message,amount);

        await transaction.wait();
        console.log("Transaction is done !")
        alert("Transation is completed !")

    }
    return <>
        <form onSubmit={buyChai}>
            <h1> MY FIRST dAPP</h1>
            <br />
            <label>Name</label> &nbsp; &nbsp; &nbsp;
            <input type="text" id="name" placeholder="Enter your name"></input>
            <br /> <br />
            <label>Message</label>
            &nbsp; 
            <input type="text" id="message" placeholder="Enter your message"></input>
            <br />
            <br />
            
            <button 
            type="submit" 
            disabled={!state.contract}
            style={{
                backgroundColor: "blue",
                color:"white",
                padding: "10px 35px",
                borderRadius: "5px"
              }}
            > PAY</button>
        </form>
    </>
}

export default Buy;