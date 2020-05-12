// Dependencies
import React from 'react'

// Components
import Layout1 from '../../layouts/Layout1'
import ButtonsContainer from '../../components/ButtonsContainer'
import Bars from '../../components/Bars'

// Styles
import './styles.scss'

const CutOptimizer = () => {
  return (
    <div className='container'>
      <Layout1>
        <ButtonsContainer />
        <Bars />
      </Layout1>
    </div>
  )
}

export default CutOptimizer

/* const handleClick = (e, shape, element) => {
    const { name, value } = e.target
    if(name === 'optimizedShape' && JSON.stringify(display[Number(value)]) !== '{}'){
      const displayArray2 = new Array(data.length).fill({display: 'none'})
      displayArray2[Number(value)]={display:'initial'}
      setDisplay(displayArray2)
    } else if (name === 'shapeToOptimize'){
      const displayArray2 = new Array(data.length).fill({display: 'none'})
      displayArray2[Number(value)]={display:'initial'}
      setDisplay(displayArray2)
    }
  } */

/* const data = mode === 'input' ? request : response.data

  const displayArray = data ? new Array(data.length).fill({display: 'none'}) : [{}]
  displayArray[0] = {display:'initial'} */

/* const [mode, setMode] = useState('input')
  const [request, setRequest] = useState([Object.assign({}, defaultShape)])
  const [response, setResponse] = useState({})
  const [display, setDisplay] = useState([])

  useEffect(() => {setDisplay(displayArray)},[])

  useEffect(() => {
    if(mode === 'output'){
      (async () => {
        try {
          const res = await fetch('https://cut-optimizer-api.now.sh/', options(request))
          const data = await res.json()
          setResponse(data)
        } catch (error) {
          console.log(error)
        }
      })()}
    }
  ,[mode])    */
