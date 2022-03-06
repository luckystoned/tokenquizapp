import web3 from 'web3' 
import { InjectedConnector } from '@web3-react/injected-connector'

const EHT_NETWORK_ID = [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
]

export const connector = new InjectedConnector({
    supportedChainIds: EHT_NETWORK_ID
})

export const getLibrary = provider => {
    const library = new web3(provider)
    return library
}

export const contract = (abi, address) => {
    const library = getLibrary(connector.getProvider())
    const contract = new library.eth.Contract(abi, address)
    return contract
}