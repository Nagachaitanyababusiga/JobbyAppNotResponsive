import {Component} from 'react'
import Cookies from 'js-cookie'
import {FcRating} from 'react-icons/fc'
import {IoLocation} from 'react-icons/io5'
import {MdBusinessCenter} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import './index.css'

class JobitemDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: null,
    isloaded: false,
  }

  componentDidMount() {
    this.fetchDetails()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {id},
      },
    } = this.props
    if (id !== prevProps.match.params.id) {
      this.fetchDetails()
    }
  }

  fetchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const query = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const res = await fetch(query, options)
    if (res.ok) {
      const data = await res.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const parsedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(x => ({
          imageUrl: x.image_url,
          name: x.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const parsedSimilarJobs = similarJobs.map(x => ({
        companyLogoUrl: x.company_logo_url,
        employmentType: x.employment_type,
        id: x.id,
        jobDescription: x.job_description,
        location: x.location,
        rating: x.rating,
        title: x.title,
      }))
      // console.log(parsedJobDetails)
      // console.log(parsedSimilarJobs)
      this.setState({
        jobDetails: parsedJobDetails,
        similarJobs: parsedSimilarJobs,
        isloaded: true,
      })
    } else {
      this.setState({jobDetails: null, similarJobs: null, isloaded: true})
    }
  }

  getSimilarjobcard = obj => (
    <Link key={obj.id} className="similaritemcard" to={`/jobs/${obj.id}`}>
      <li key={obj.id} className="similaritemcardcont">
        <div className="similarjobtopcont">
          <img
            alt="similar job company logo"
            className="similaritemcardlogo"
            src={obj.companyLogoUrl}
          />
          <div className="similarjobtitle">
            <p className="similarjobtitletext">{obj.title}</p>
            <div className="similarjobrating">
              <FcRating className="similarjobratingicon" />
              <p>{obj.rating}</p>
            </div>
          </div>
        </div>
        <p className="similarcardsdescription">Description</p>
        <p>{obj.jobDescription}</p>
        <div className="similarjobcardiconscont">
          <div className="similarcardlocation">
            <IoLocation className="similarjobcardiconlocation" />
            <p>{obj.location}</p>
          </div>
          <div className="similarcardlocation">
            <MdBusinessCenter className="similarjobcardiconlocation" />
            <p>{obj.employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )

  renderpage = (jobDetails, similarJobs) => {
    if (jobDetails === null && similarJobs === null) {
      return (
        <div className="Jobitemdetailscont">
          <div className="jobitemdeatilsinner">
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
              onClick={() => this.fetchDetails()}
            >
              Retry
            </button>
          </div>
        </div>
      )
    }
    const {
      title,
      rating,
      companyLogoUrl,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails
    // console.log(this.state)
    return (
      <div className="Jobitemdetailscont">
        <div className="Jobitemdetailscard">
          <div className="Jobitemdetailsheadercont">
            <div className="Jobitemdetailslogo">
              <img
                src={companyLogoUrl}
                className="jobitemdeatilscompanylogo"
                alt="job details company logo"
              />
              <div className="Jobitemdetailstitle">
                <h1 className="jobitemdetailsheading">{title}</h1>
                <div className="Jobitemdetailsrating">
                  <FcRating className="jobitemdeatilsstart" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="headerloweritemcont">
              <div className="employmenttypeandlocation">
                <div className="eachitemcont">
                  <IoLocation className="locationiconstyler" />
                  <p>{location}</p>
                </div>
                <div className="eachitemcont">
                  <MdBusinessCenter className="locationiconstyler" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="jobitemdetailsdivider" />
          <div className="jobitemdetailslowerupper">
            <h1>Description</h1>
            <a href={companyWebsiteUrl} className="websiteredirect">
              <p className="jobitemdetailsvisit">Visit</p>
              <FaExternalLinkAlt />
            </a>
          </div>
          <p>{jobDescription}</p>
          <div>
            <h1>Skills</h1>
            <ul className="skillscont">
              {skills.map(x => (
                <li key={x.name} className="skillitemcont">
                  <img alt={x.name} className="skillimage" src={x.imageUrl} />
                  <p className="skilltitle">{x.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Life at Company</h1>
            <div className="lifeAtCompanycont">
              <p className="lifeAtCompanydes">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <div className="similarjobscont">
          <h1>Similar Jobs</h1>
          <ul className="similarcardscont">
            {similarJobs.map(x => this.getSimilarjobcard(x))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {jobDetails, similarJobs, isloaded} = this.state
    if (isloaded)
      return (
        <>
          <NavBar />
          {this.renderpage(jobDetails, similarJobs)}
        </>
      )
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }
}
export default JobitemDetails
