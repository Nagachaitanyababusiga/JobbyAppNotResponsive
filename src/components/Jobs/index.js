import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import NavBar from '../NavBar'
import JobItem from '../JobItem'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: null,
    profileloaded: false,
    salary: '',
    types: [],
    search: '',
    toDisplay: null,
    toDisplayloaded: false,
  }

  componentDidMount() {
    this.GetProfile()
    this.fetchDetails(
      'https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=',
    )
  }

  changeSalary = event => {
    this.setState({salary: event.target.value}, () => {
      const {salary, types, search} = this.state
      const typesvalue = types.join(',')
      const query = `https://apis.ccbp.in/jobs?employment_type=${typesvalue}&minimum_package=${salary}&search=${search}`
      this.fetchDetails(query)
    })
  }

  fetchDetails = async query => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const res = await fetch(query, options)
    if (res.ok) {
      const parsedData = await res.json()
      const {jobs} = parsedData
      const parsedjobs = jobs.map(x => ({
        companyLogoUrl: x.company_logo_url,
        employmentType: x.employment_type,
        id: x.id,
        jobDescription: x.job_description,
        location: x.location,
        packagePerAnnum: x.package_per_annum,
        rating: x.rating,
        title: x.title,
      }))
      this.setState({toDisplay: parsedjobs, toDisplayloaded: true})
    } else {
      this.setState({toDisplay: null, toDisplayloaded: true})
    }
  }

  GetProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/profile'
    const data = await fetch(url, options)
    if (data.ok) {
      const parsedData = await data.json()
      const help = parsedData.profile_details
      const profileDetails = {
        name: help.name,
        profileImageUrl: help.profile_image_url,
        shortBio: help.short_bio,
      }
      this.setState({profileDetails, profileloaded: true})
    } else {
      this.setState({profileDetails: null, profileloaded: true})
    }
  }

  changeChecker = (event, value) => {
    const {types} = this.state
    let modifiedtypes = null
    if (event.target.checked) {
      modifiedtypes = types
      modifiedtypes.push(value)
    } else {
      modifiedtypes = types.filter(x => x !== value)
    }
    this.setState({types: modifiedtypes}, () => {
      const {salary, search} = this.state
      const typesvalue = modifiedtypes.join(',')
      const query = `https://apis.ccbp.in/jobs?employment_type=${typesvalue}&minimum_package=${salary}&search=${search}`
      this.fetchDetails(query)
    })
  }

  changeSearchValue = event => {
    this.setState({search: event.target.value})
  }

  renderProfileSection = profileDetails => {
    if (profileDetails === null) {
      return (
        <div className="profileDiv">
          <button
            className="profileRetry"
            type="button"
            onClick={this.GetProfile}
          >
            Retry
          </button>
        </div>
      )
    }

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileCard">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profilename">{name}</h1>
        <p className="profilepara">{shortBio}</p>
      </div>
    )
  }

  GetJobItemDetails = toDisplay =>
    toDisplay.length === 0 ? (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="jobsNotfoundjobs"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="listcont">
        {toDisplay.map(x => (
          <li key={x.id}>
            <JobItem Details={x} />
          </li>
        ))}
      </ul>
    )

  rendermainpage = (toDisplay, query) => {
    if (toDisplay === null) {
      return (
        <div>
          <img
            className="pageNotfoundjobs"
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button
            className="profileRetry"
            type="button"
            onClick={() => this.fetchDetails(query)}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.GetJobItemDetails(toDisplay)
  }

  render() {
    const {
      profileDetails,
      salary,
      types,
      search,
      toDisplay,
      profileloaded,
      toDisplayloaded,
    } = this.state
    const typesvalue = types.join(',')
    const query = `https://apis.ccbp.in/jobs?employment_type=${typesvalue}&minimum_package=${salary}&search=${search}`
    // console.log(toDisplay)
    return (
      <div>
        <NavBar />
        <div className="downCont">
          <div className="innerdownCont">
            <div className="jobs1stcont">
              {profileloaded ? (
                this.renderProfileSection(profileDetails)
              ) : (
                <div className="loader-cont" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )}
              <hr className="linedivider" />
              <div>
                <h1 className="checkerboxhead">Type of Employement</h1>
                {employmentTypesList.map(x => (
                  <div className="checkerboxcont" key={x.id}>
                    <input
                      type="checkbox"
                      className="checkerbox"
                      value={x.employmentTypeId}
                      onChange={event => {
                        this.changeChecker(event, x.employmentTypeId)
                      }}
                      id={x.employmentTypeId}
                    />
                    <label htmlFor={x.employmentTypeId}>{x.label}</label>
                  </div>
                ))}
              </div>
              <hr className="linedivider" />
              <div>
                <h1 className="checkerboxhead">Salary Range</h1>
                {salaryRangesList.map(x => (
                  <div className="checkerboxcont" key={x.id}>
                    <input
                      type="radio"
                      className="checkerbox"
                      checked={salary === x.salaryRangeId}
                      id={x.salaryRangeId}
                      value={x.salaryRangeId}
                      onChange={this.changeSalary}
                    />
                    <label htmlFor={x.salaryRangeId}>{x.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="jobs2ndcont">
              <div className="searchboxcont">
                <input
                  type="search"
                  placeholder="Search"
                  className="inputersearch"
                  onChange={this.changeSearchValue}
                  value={search}
                />
                <button
                  type="button"
                  className="iconbutton"
                  data-testid="searchButton"
                  aria-label="Search"
                  onClick={() => {
                    this.fetchDetails(query)
                  }}
                >
                  <BsSearch className="searchicon" />
                </button>
              </div>
              <div>
                {toDisplayloaded ? (
                  this.rendermainpage(toDisplay, query)
                ) : (
                  <div className="loader-container" data-testid="loader">
                    <Loader
                      type="ThreeDots"
                      color="#ffffff"
                      height="50"
                      width="50"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
