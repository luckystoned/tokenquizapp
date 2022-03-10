import { useEffect, useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected, changeToRopsten, getQuizBalance, sendQuizToContract } from '../web3'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import QuizGame from '../components/QuizGame/quizGame'





export const getStaticProps = async () => {

  //Get Quiz Questions
  const surveyRes = await fetch('https://ratherlabs-challenges.s3.sa-east-1.amazonaws.com/survey-sample.json')
  const survey = await surveyRes.json()

  return {
    props: {
      survey: survey
    }
  }

}


export default function Home({survey}) {
  
  //useWeb3React hooks to get web3 instance and user account
  const { activate, active, account, chainId, deactivate, error } = useWeb3React()
  
  //check if user is connected to the correct network
  const isRopsten = chainId === 3;
  
  //set user balance
  const [balance, setBalance] = useState('0')
  
  //Sate of contract response
  const [contractRes, setContractRes] = useState([])

  //Set UI until contract response
  const [isLoading, setIsLoading] = useState(false)

  //Set Quiz Game UI
  const [isQuiz, setIsQuiz] = useState(false)
  
  //Change to Ropsten function
  const handleChangeChain = () => {
    
    changeToRopsten()
  }
  
  //Get user balance function
  const handleBalance = useCallback(() => {
    
    getQuizBalance(account)
    .then((balance) => {
      setBalance(balance);
    })
    .catch( err => console.log("er",err))
    
  }, [account]);
  
  //Connect user to Metamask and get balance if is coneected to Ropsten
  const handleConnect = useCallback(() => {
    
    activate(injected)
    localStorage.setItem('previuoslyConnected', true)
    
    if(isRopsten) {
      
      handleBalance()
    }
    
  }, [activate, isRopsten, handleBalance])
  
  //Discount user from Metamask
  const handleDisconnect = () => {
    
    deactivate()
    localStorage.removeItem('previuoslyConnected')
  }
  
  //handle contract response
  const handleContractResponse = useCallback( async (a, b) => {

    setContractRes([a, b])
    setIsQuiz(false)
    setIsLoading(true)
  }, [])
  
  //Send Quiz function
  const handleSendQuiz = async (answer) => {
    sendQuizToContract(answer, account, handleContractResponse)
  }
    
  //Start quiz function
  const handleStartQuiz = () => {
    
    setIsQuiz(true)
  }
  
  //Allow user to connect to Metamask if previuoslyConnected
  useEffect(() => {
    
    if (localStorage.getItem('previuoslyConnected') === 'true')
    handleConnect()
      
  }, [handleConnect])

  //Catch contract response and set UI
  useEffect(() => {

    if(contractRes[1] !== undefined) {

      setIsLoading(false)
      
      if(contractRes[1].status) {

        console.log("success")
        handleBalance()
      }else {
        //use this to show error, like toast
        console.log(contractRes[0].message)
      }
    }
  
  } , [contractRes, handleBalance, isLoading])
    
  

  //Set UI based on user connection
  const initQuizButton = isRopsten ? (
      <Box>
        <Button variant="contained" onClick={handleDisconnect}>Disconnect wallet!</Button >
        <h2>
          Your addres is: {account}
          <br />
          Your Balance is: {balance} QUIZ
        </h2>
        <Button variant="contained" onClick={handleStartQuiz}>Start QUIZ</Button >
      </Box>
    ) : (
      <Button variant="contained" onClick={handleChangeChain}>Change to Ropsten!</Button >
    )

  //Set error message
  if (error) {  
    return (
      <Box>
        <Typography variant="h1" component="div" gutterBottom>
          Upps! There was a connection error:
        </Typography>
        <Typography variant="body1" gutterBottom>
        {error.message}
        </Typography>
      </Box>
    )
  }

  
  if(isLoading) {
    return (
      <Typography variant="h1" component="div" gutterBottom>
        Sending QUIZ...
      </Typography>
    )
  }
  
  //set isLoading UI
  if(isQuiz) {
    return <QuizGame handleSendQuiz={handleSendQuiz} survey={survey}/>
  }
  
  return (
    <Box textAlign='center'> 
      <Typography variant="h1" component="div" gutterBottom>
        QuizApp
      </Typography>
      {
        active ? initQuizButton : (
          //User connected but not on Ropsten
          <Button variant="contained" onClick={handleConnect}>Connect wallet!</Button >
        )
      }
    </Box>

  )
}
