import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import surveyAbi from './abi/survey-abi.json'

//this file contains the web3 instance and methods to interact with the blockchain and Survey contract

//set Survey contract
const contractAddres = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03'
let surveyContract

//set web3 instance
let isInitialized = false

export const init = async () => {

	let provider = window.ethereum

	const web3 = new Web3(provider)

	surveyContract = new web3.eth.Contract(
		surveyAbi,
		// QUIZZ contract on Ropsten
		contractAddres
	)

	isInitialized = true
}

//Set Supported ChainIds
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

//Chain Methods
export const changeToRopsten = async () => {
    
    return window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x3' }],
    })
}

//Balance Method
export const getQuizzBalance = async (account) => {

	if (!isInitialized) {
		await init()
	}

	return surveyContract.methods
		.balanceOf(account)
		.call()
		.then((balance) => {
			return Web3.utils.fromWei(balance)
		})
}

//Send Quizz Method
export const sendQuizzToContract = async (quizz, account, handleContractResponse) => {
    
    if (!isInitialized) {
        await init()
    }
    
    return surveyContract.methods
        .submit(0, quizz)
        .send({ from: account})
        .on('transactionHash', handleContractResponse)
        .on('error', handleContractResponse)
        .on("confirmation", handleContractResponse)
        .catch(handleContractResponse)
}