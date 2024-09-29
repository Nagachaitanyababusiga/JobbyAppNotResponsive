import {FcRating} from 'react-icons/fc'
import {IoLocation} from 'react-icons/io5'
import {MdBusinessCenter} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {Details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = Details
  return (
    <Link to={`/jobs/${id}`} className="custom-link">
      <div className="jobitemcard">
        <div className="jobitemiconcont">
          <img
            src={companyLogoUrl}
            className="jobitemlogo"
            alt="company logo"
          />
          <div className="jobitemtitlecont">
            <h1 className="jobitemtitleheader">{title}</h1>
            <div className="jobitemratingcont">
              <FcRating className="jobitemtitlestaricon" />
              <p className="jobitemtitlestariconlable">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobitemlpacont">
          <div className="jobitemlpaiconscont">
            <div className="jobitemlpaiconcontent">
              <IoLocation className="jobitemlpaicon" />
              {location}
            </div>
            <div className="jobitemlpaiconcontent">
              <MdBusinessCenter className="jobitemlpaicon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="jobitemlinedivider" />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItem
