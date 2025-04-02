import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import HomeSection from "./components/Homesection";
// import CourseSection from "./pages/Courses";

import HomeSection from "./components/Homesection";
import LoginPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ContactPage from "./pages/Contact";
// import TestimonialsSection from "./components/TestimonialSection";
// import SolvitStory from "./components/OurStory";
// import TeamProfiles from "./components/Team";
import About from "./pages/About";
import Home from "./pages/Home";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import CourseListSection from "./components/CourseList";
import AssignmentTracker from "./components/Assignment";

import MessageApp from "./components/Message";
import AssignmentManagement from "./components/MAssignmentManagement";
import CourseManagement from "./components/CourseManagement";
import VerifyOTP from "./components/otp";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import CourseResources from "./components/CourseResources";
import LearnerResources from "./components/LearnerResources";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Other routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mentordashboard" element={<MentorDashboard />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          


          {/* Learner dashboard and nested courses route */}
          <Route path="/learnerdashboard" element={<LearnerDashboard />}>
            <Route index element={<CourseListSection />} /> 
            <Route path="courses" element={<CourseListSection />} />
            <Route path="assignments" element={<AssignmentTracker />} />
            <Route path="learnerresources" element={<LearnerResources />} />
          </Route>
          
          <Route path="/mentordashboard" element={<MentorDashboard />}>
            <Route index element={<CourseManagement />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="assignments" element={<AssignmentManagement />} />
            <Route path="messages" element={<MessageApp />} />
            <Route path="course-resources" element={<CourseResources />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
