import { useState, useEffect } from 'react'
import { getERC20Contract } from '../store/contractStore'
import { useWeb3React } from '@web3-react/core'

export default function useBalance(
  tokenAddress
) {
  const [balance, setBalance] = useState('0')

  const { account, library } = useWeb3React()

  useEffect(() => {
    let isCancelled = false

    function getBalance() {
      return new Promise((resolve) => {
        
        try {
            const contract = getERC20Contract(tokenAddress, library)
            console.log(contract?.methods)
            return 2
        } catch (error) {
          resolve(value)
          console.log(error)
        }
      })
    }

    async function run() {
      const bn = await getBalance()
      if (!isCancelled) {
        setBalance(bn)
      }
    }

    run()

    return () => {
      isCancelled = true
    }
  }, [tokenAddress, library, account])

  return [balance]
}