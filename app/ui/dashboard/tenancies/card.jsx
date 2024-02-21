import Avatar from 'react-avatar'
import styles from './card.module.css'
const Card = ({data}) => {

  return (
    <div className={styles.container}>
      {/* {JSON.stringify(data)} */}
      <div className={styles.image_container}>
        <Avatar
          size="100"
          round={true}
          src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
        />
        {/* <Image className={styles.image} alt="user" src={data.picture} width={50} height={50}/> */}
        <div>
          {" "}
          <span className={styles.name}>{data.full_name}000</span>
          <span
            className={styles.phone}
          >{`${data.country_code}${data.phone}`}</span>
          <span className={styles.email}>{data.email}</span>
          <span
            className={
              data.isverified == "Y" ? styles.isverified : styles.notVerified
            }
          >
            Verified: {data.isverified == "Y" ? "Yes" : "No"}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Card
