import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {apiStatus: apiStatusConstent.initial, travelData: []}

  componentDidMount() {
    this.getTravelGuideData()
  }

  getTravelGuideData = async () => {
    this.setState({apiStatus: apiStatusConstent.inprogress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formatedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        travelData: formatedData,
        apiStatus: apiStatusConstent.success,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelCards = () => {
    const {travelData} = this.state
    return (
      <ul className="travelCard-list">
        {travelData.map(eachItem => (
          <li className="travelCard" key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="thumbnail-image"
            />
            <div className="travelDetails-container">
              <h1 className="travelCard-name">{eachItem.name}</h1>
              <p className="travelCard-discription">{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstent.inprogress:
        return this.renderLoadingView()
      case apiStatusConstent.success:
        return this.renderTravelCards()
      default:
        return null
    }
  }

  render() {
    const {travelData} = this.state
    console.log(travelData)
    return (
      <div className="appBg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderApiStatusView()}
      </div>
    )
  }
}
export default App
