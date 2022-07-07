import './share.scss';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'

export default function Share() {
  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img className="share-profile-img" src="/assets/person/1.jpeg" alt="" />
          <input type="text" className='share-input' placeholder="What's in your mind Akshay?" />
        </div>
        <hr className="share-hr" />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option">
              <PermMedia htmlColor='tomato' className="share-icon" />
              <span className="share-option-text">Photo or Video</span>
            </div>
            <div className="share-option">
              <Label className="share-icon" htmlColor='blue' />
              <span className="share-option-text">Tag</span>
            </div>
            <div className="share-option">
              <Room className="share-icon" htmlColor='green' />
              <span className="share-option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions className="share-icon" htmlColor='goldenrod' />
              <span className="share-option-text">Feelings</span>
            </div>
          </div>
          <button className='share-button'>Share</button>
        </div>
      </div>
    </div>
  )
}
