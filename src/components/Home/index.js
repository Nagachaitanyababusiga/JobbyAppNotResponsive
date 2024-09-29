import './index.css'
import NavBar from '../NavBar'

const Home = props => {
  const navigate = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div>
      <NavBar />
      <div className="homecont">
        <div className="hometextcont">
          <h1 className="homeheader">Find The Job That Fits Your Life</h1>
          <p className="homepara">
            Millions of people are searching for jobs,salary,information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <button className="findjobsbtn" type="button" onClick={navigate}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default Home
