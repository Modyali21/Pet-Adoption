import React from 'react'
import './StaffProfile.css'
import { useState,useEffect } from "react"
import { useAuth, upload } from "../../firebase"
import axios from 'axios'
import { SERVER_URL } from '../../constants'
const StaffProfile = (props) => {
    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://cdn.vectorstock.com/i/preview-1x/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp");

    function handleBrowse(event) {
        upload(event.target.files[0], currentUser, setLoading, setPhotoURL);
    }
    const [studentData, setStudentData] = useState()

    useEffect(() => {
        console.log(props.user.username)
        console.log(props.user.password)
        axios.get(SERVER_URL + '/profile', {
            auth: {
                username: props.user.username,
                password: props.user.password
            }
        })
            .then(response => {
                console.log(response.data)
                setStudentData(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    return (
        <>
            <div className="all-staff">
                <div className="image-container-staff">
                    <div className="profile-staff">
                        <img id="profile" src={photoURL} alt='profile' className='profile-img' />
                        <input type="file" id="file-input" name="file-input" onChange={handleBrowse} />
                        <label disabled={loading} id="file-input-label-staff" for="file-input">Edit profile picture</label>
                        <h2>{props.name}</h2>
                        <span className="user-status-staff">{props.user.role}</span>
                        <span className="user-about-staff">Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights </span>
                    </div>
                    <div><button to="/updateprofile" className="btn btn-light edit-profile-staff">Edit Profile</button></div>
                </div>
                <div className="intro-staff">
                    <h1 id="header1-staff">ONLINE LEARNING PLATFORM</h1>
                    <h3 id="header2-staff">Boost your knowlegde</h3>
                    <span className="intro-discription-staff">Lorem, ipsum. Sunt recusandae ea dolorem nemo perspiciatis quasi mollitia fugiat quae ullam neque voluptatum illo unde, facere accusamus provident quos et quidem dignissimos, assumenda dolore nisi. Natus nemo perspiciatis facilis hic, quia accusantium totam nesciunt! Ab deleniti animi sint natus temporibus impedit qui sapiente eius.</span>
                    <div className="buttons-staff">
                        {props.role === 'instructor' ||  props.role === 'admin' ?
                            (<div className="button-staff"><button to="/makecourse" className="btn btn-light ">Create Course</button></div>) :
                            (<></>)
                        }
                        <div className="button-staff"><button to="/courseenroll" className="btn btn-light ">View Courses</button></div>
                    </div>
                </div>
            </div>
            <div className='staff-info-container container'>
            <div className='staffinfo' id="staff-info" >
                <section id='staff'>STAFF INFORMATION</section>
                <div className='staff-info-container'>
                    <ul>
                        <li >Name: <span>{studentData?.name}</span></li>
                        <li >Email: <span>{studentData?.email}</span></li>
                        <li >Phone: <span>{studentData?.phone}</span></li>
                        <li >Shelter associated with: <span>Mahmoudya</span></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
export default StaffProfile;
