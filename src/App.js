import "./App.css";
import {
  Header,
  CreateShelter,
  Signup,
  Login,
  PetProfile,
  HomePage,
  NotFound,
  StaffProfile,
  CreatePetProfile,
  Application,
  Pets,
  Shelters,
  ShelterProfile,
} from "./components/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <>
      {/* Document not done */}
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/shelterprofile" element={<ShelterProfile />} />{" "}
          {/* no back end*/}
          <Route
            path="/profile"
            element={<StaffProfile user={cookies.user} />}
          />{" "}
          {/* done */}
          <Route path="/createpetprofile" element={<CreatePetProfile />} />{" "}
          {/* no back end*/}
          <Route
            path="/shelters"
            element={<Shelters user={cookies.user} />}
          />{" "}
          {/* done ,,, need sort by*/}
          <Route path="/application" element={<Application />} />{" "}
          {/* no back end */}
          <Route path="/pets" element={<Pets />} />{" "}
          {/* no back end ,, need search by khaled ,, sort by backend */}
          <Route
            path="/createshelter"
            element={<CreateShelter user={cookies.user} />}
          />{" "}
          {/* Done */}
          <Route path="/homepage" element={<HomePage />} />{" "}
          {/* done ,, need buttons */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />{" "}
          {/* Done */}
          <Route path="/signup" element={<Signup />} />{" "}
          {/* done ,, how staff assign shelter ? */}
          <Route path="/petprofile" element={<PetProfile />} />{" "}
          {/*  need backend */}
          <Route path="*" element={<NotFound />} /> {/* Done */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// <BrowserRouter>
//         <Routes>
//           <Route
//             path="/elearning"
//             element={
//               <>
//                 <Header />
//                 <HomePage />
//               </>
//             }
//           />
//           <Route path="/makecourse" element={<MakeCourse user={cookies.user} />} />
//           <Route path="/makelecture" element={<MakeLecture user={cookies.user} cid={courseId} />} />
//           <Route path="/makeannoun" element={<MakeAnnounm user={cookies.user}  cid={courseId}/>} />
//           <Route path="*" element={<NotFound user={cookies.user} />} />
//           <Route path="/admin" element={<><Admin user={cookies.user} /></>} />
//           <Route index  element={
//             <CookiesProvider>

//                 <div>
//                   {cookies.user || !cookies.user ? (
//                     <Login onLogin={handleLogin} />
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               </CookiesProvider>
//             }
//           />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/updateprofile"
//             element={
//               <>
//                 <Header />
//                 <UpdateProfile user={cookies.user} />
//               </>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
